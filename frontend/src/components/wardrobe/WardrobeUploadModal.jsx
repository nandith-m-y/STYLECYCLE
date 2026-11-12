import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { Upload, X, Image as ImageIcon, AlertTriangle, Loader2 } from "lucide-react";
import { SIZES, COLORS } from "../../data/categories";
import { validateImageBatch, compressAndResizeImage, MAX_BATCH_IMAGE_COUNT } from "../../utils/imageSecurity";

const WARDROBE_CATEGORIES = [
  "Tops", "T-shirts", "Shirts", "Jeans", "Trousers", 
  "Dresses", "Ethnic Wear", "Jackets", "Shoes", "Accessories"
];

const SEASONS = ["All Season", "Summer", "Winter", "Monsoon", "Autumn", "Spring"];
const STYLES = ["Casual", "Streetwear", "Formal", "Minimalist", "Traditional", "Smart Casual"];
const OCCASIONS = ["Casual", "Office", "College", "Party", "Wedding", "Travel", "Formal"];

export const WardrobeUploadModal = ({ isOpen, onClose, onUpload }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Shirts");
  const [color, setColor] = useState("White");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("M");
  const [season, setSeason] = useState("All Season");
  const [style, setStyle] = useState("Smart Casual");
  const [occasion, setOccasion] = useState("Casual");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [isProcessingImages, setIsProcessingImages] = useState(false);

  const handleImageChange = async (e) => {
    setError("");
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const remainingSlots = MAX_BATCH_IMAGE_COUNT - images.length;
    if (remainingSlots <= 0) {
      setError(`Maximum limit reached. You can only attach up to ${MAX_BATCH_IMAGE_COUNT} images per garment.`);
      return;
    }

    // Validate files for size, MIME type and allowed extensions (rejects SVG)
    const validation = validateImageBatch(files, remainingSlots);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    setIsProcessingImages(true);
    try {
      // Downscale and compress each image via Canvas to prevent browser storage exhaustion
      const compressedUrls = await Promise.all(
        validation.validFiles.map(file => compressAndResizeImage(file, 800, 1000, 0.78))
      );
      setImages(prev => [...prev, ...compressedUrls]);
    } catch (err) {
      setError(`Image processing error: ${err.message}`);
    } finally {
      setIsProcessingImages(false);
      // Reset input element value so the same file could be selected again if needed
      e.target.value = "";
    }
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please provide a garment name.");
      return;
    }

    try {
      const defaultImg = images.length > 0 ? images[0] : "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80";

      const itemData = {
        name: name.trim(),
        category,
        type: ["Shirts", "Tops", "T-shirts"].includes(category) ? "top" : ["Jeans", "Trousers"].includes(category) ? "bottom" : ["Jackets"].includes(category) ? "outerwear" : ["Shoes"].includes(category) ? "shoes" : "accessories",
        color,
        brand: brand.trim() || "Unbranded / Custom",
        size,
        season,
        style,
        occasion,
        image: defaultImg,
        allImages: images,
        // Metadata prepared for future computer vision classification
        cvMetadata: {
          dominantColor: color,
          pattern: "Solid",
          detectedCategory: category,
          confidence: 0.94
        }
      };

      onUpload(itemData);
      // Reset form
      setName("");
      setBrand("");
      setImages([]);
      setError("");
      onClose();
    } catch (storageErr) {
      setError(`Unable to save to wardrobe: ${storageErr.message || "Browser storage limit reached."}`);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Digitize Garment to Wardrobe" maxWidth="max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Photo Upload Area */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-dark">
            Garment Photography:
          </label>
          <div className="border-2 border-dashed border-border rounded-md p-6 text-center hover:border-primary transition-colors bg-secondary/50">
            <input
              type="file"
              id="wardrobe-file-input"
              multiple
              accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              disabled={isProcessingImages || images.length >= MAX_BATCH_IMAGE_COUNT}
              className="hidden"
            />
            <label htmlFor="wardrobe-file-input" className="cursor-pointer flex flex-col items-center">
              {isProcessingImages ? (
                <Loader2 className="w-8 h-8 text-primary mb-2 animate-spin stroke-[1.5]" />
              ) : (
                <Upload className="w-8 h-8 text-primary mb-2 stroke-[1.5]" />
              )}
              <span className="text-xs font-semibold text-dark">
                {isProcessingImages ? "Optimizing & Securing Photos..." : "Click to upload photos"}
              </span>
              <span className="text-[11px] text-dark-muted mt-1">
                JPEG, PNG, WebP only (max 5 MB per photo, up to 5 photos). SVG/executables rejected.
              </span>
            </label>
          </div>

          {/* Previews */}
          {images.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {images.map((img, i) => (
                <div key={i} className="relative w-20 h-24 rounded border border-border overflow-hidden group">
                  <img src={img} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 p-0.5 bg-black/70 text-white rounded-full hover:bg-black"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-xs font-semibold uppercase tracking-wider text-dark">
              Garment Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Crisp Poplin White Shirt"
              className="w-full text-xs p-2.5 bg-secondary border border-border rounded-sm focus:outline-none focus:border-primary"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold uppercase tracking-wider text-dark">
              Brand / Label
            </label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="e.g. Zara, COS, Vintage..."
              className="w-full text-xs p-2.5 bg-secondary border border-border rounded-sm focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Attributes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-dark">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-xs p-2 bg-secondary border border-border rounded-sm"
            >
              {WARDROBE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-dark">Color</label>
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full text-xs p-2 bg-secondary border border-border rounded-sm"
            >
              {COLORS.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-dark">Size</label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full text-xs p-2 bg-secondary border border-border rounded-sm"
            >
              {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-dark">Season</label>
            <select
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              className="w-full text-xs p-2 bg-secondary border border-border rounded-sm"
            >
              {SEASONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-dark">Style Aesthetic</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full text-xs p-2 bg-secondary border border-border rounded-sm"
            >
              {STYLES.map(st => <option key={st} value={st}>{st}</option>)}
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-dark">Occasion</label>
            <select
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              className="w-full text-xs p-2 bg-secondary border border-border rounded-sm"
            >
              {OCCASIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>

        {error && <p className="text-xs text-rose-600">{error}</p>}

        <div className="flex justify-end gap-3 pt-3 border-t border-border">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-dark-muted hover:text-dark"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="luxury-btn luxury-btn-primary px-6 py-2.5 rounded-sm text-xs uppercase tracking-wider font-semibold"
          >
            Add to Wardrobe
          </button>
        </div>
      </form>
    </Modal>
  );
};
