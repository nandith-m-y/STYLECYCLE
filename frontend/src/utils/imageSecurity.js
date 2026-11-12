/**
 * STYLECYCLE - Image Security & Storage Sanitization Utility
 *
 * ARCHITECTURAL DEFENSE-IN-DEPTH NOTICE:
 * Client-side file validation enforces acceptable raster MIME types, extensions,
 * and sizes to prevent client DoS and LocalStorage QuotaExceededError crashes.
 *
 * PHASE 2 BACKEND ENFORCEMENT REQUIREMENT:
 * In Phase 2, the FastAPI backend will:
 * 1. Perform cryptographic magic-byte sniffing (via python-magic / libmagic).
 * 2. Strip embedded EXIF and GPS geolocation metadata.
 * 3. Completely re-encode image buffers through Pillow/libvips before writing to S3/Cloud Storage.
 * 4. Serve uploaded assets through a dedicated sandbox CDN domain with 'Content-Security-Policy: default-src 'none''.
 */

export const ALLOWED_IMAGE_MIME_TYPES = Object.freeze([
  "image/jpeg",
  "image/png",
  "image/webp"
]);

export const ALLOWED_IMAGE_EXTENSIONS = Object.freeze([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp"
]);

export const FORBIDDEN_EXTENSIONS = Object.freeze([
  ".svg",
  ".svgz",
  ".html",
  ".htm",
  ".xml",
  ".js",
  ".exe",
  ".sh",
  ".bat",
  ".cmd",
  ".php"
]);

export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB maximum
export const MAX_BATCH_IMAGE_COUNT = 5; // Max 5 images per upload batch

/**
 * Validates a single image file for MIME type, file extension, and size limits.
 * Explicitly rejects SVG (to mitigate stored XSS via SVG scripts) and executable files.
 *
 * @param {File} file
 * @returns {{ valid: boolean, error: string | null }}
 */
export function validateImageFile(file) {
  if (!file) {
    return { valid: false, error: "No file was selected." };
  }

  // 1. File size check (5 MB cap)
  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `File "${file.name}" exceeds the 5 MB limit (${sizeInMb} MB). Please choose a smaller image.`
    };
  }

  if (file.size === 0) {
    return { valid: false, error: `File "${file.name}" is empty (0 bytes).` };
  }

  // 2. Filename and extension check
  const fileName = (file.name || "").toLowerCase();
  const hasForbiddenExt = FORBIDDEN_EXTENSIONS.some((ext) => fileName.endsWith(ext));
  if (hasForbiddenExt || fileName.includes(".svg")) {
    return {
      valid: false,
      error: `SVG and vector files are strictly disallowed for security reasons. Please upload JPEG, PNG, or WebP.`
    };
  }

  const hasAllowedExt = ALLOWED_IMAGE_EXTENSIONS.some((ext) => fileName.endsWith(ext));
  if (!hasAllowedExt) {
    return {
      valid: false,
      error: `Unsupported file extension for "${file.name}". Only .jpg, .jpeg, .png, and .webp are accepted.`
    };
  }

  // 3. MIME type check
  if (!ALLOWED_IMAGE_MIME_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Unsupported format (${file.type || "unknown"}). Only JPEG, PNG, and WebP raster images are allowed.`
    };
  }

  return { valid: true, error: null };
}

/**
 * Validates an array or FileList of files.
 *
 * @param {FileList | File[]} fileList
 * @param {number} maxCount
 * @returns {{ valid: boolean, error: string | null, validFiles: File[] }}
 */
export function validateImageBatch(fileList, maxCount = MAX_BATCH_IMAGE_COUNT) {
  if (!fileList || fileList.length === 0) {
    return { valid: false, error: "Please select at least one image.", validFiles: [] };
  }

  if (fileList.length > maxCount) {
    return {
      valid: false,
      error: `You may upload at most ${maxCount} images per operation (received ${fileList.length}).`,
      validFiles: []
    };
  }

  const validFiles = [];
  for (let i = 0; i < fileList.length; i++) {
    const file = fileList[i];
    const validation = validateImageFile(file);
    if (!validation.valid) {
      return { valid: false, error: validation.error, validFiles: [] };
    }
    validFiles.push(file);
  }

  return { valid: true, error: null, validFiles };
}

/**
 * Downscales and compresses an image to an offscreen HTML5 Canvas.
 * Exports a lightweight WebP or JPEG Data URL (~30-60 KB) to prevent
 * LocalStorage quota exhaustion (QuotaExceededError) and client DoS.
 *
 * @param {File} file
 * @param {number} maxWidth
 * @param {number} maxHeight
 * @param {number} quality (0.0 to 1.0)
 * @returns {Promise<string>} Base64 Data URL
 */
export function compressAndResizeImage(file, maxWidth = 800, maxHeight = 1000, quality = 0.78) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => {
      reject(new Error(`Failed to read file: ${file.name}`));
    };

    reader.onload = (readerEvent) => {
      const img = new Image();

      img.onerror = () => {
        reject(new Error(`Corrupted or unrenderable image file: ${file.name}`));
      };

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect-ratio preserved dimensions
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          // Fallback if canvas context fails
          return resolve(readerEvent.target.result);
        }

        // Draw image onto canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to WebP or fallback to JPEG
        let dataUrl;
        try {
          dataUrl = canvas.toDataURL("image/webp", quality);
          if (!dataUrl.startsWith("data:image/webp")) {
            dataUrl = canvas.toDataURL("image/jpeg", quality);
          }
        } catch (e) {
          dataUrl = canvas.toDataURL("image/jpeg", quality);
        }

        resolve(dataUrl);
      };

      img.src = readerEvent.target.result;
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Safely writes to localStorage with error handling for QuotaExceededError.
 *
 * @param {string} key
 * @param {any} value
 * @returns {{ success: boolean, error: string | null }}
 */
export function safeStorageSetItem(key, value) {
  try {
    const serialized = typeof value === "string" ? value : JSON.stringify(value);
    localStorage.setItem(key, serialized);
    return { success: true, error: null };
  } catch (error) {
    const isQuota =
      error instanceof DOMException &&
      (error.name === "QuotaExceededError" ||
        error.code === 22 ||
        error.code === 1014 ||
        error.name === "NS_ERROR_DOM_QUOTA_REACHED");

    if (isQuota) {
      console.error(`[STYLECYCLE STORAGE ERROR] Browser storage quota exceeded while saving "${key}".`, error);
      return {
        success: false,
        error: "Browser local storage is full. Please remove some items or clear old demo listings to free up space."
      };
    }

    console.error(`[STYLECYCLE STORAGE ERROR] Failed saving key "${key}".`, error);
    return {
      success: false,
      error: `Storage write failed: ${error.message || "Unknown error"}`
    };
  }
}

