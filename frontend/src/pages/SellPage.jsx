import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useListings } from "../context/ListingContext";
import { productService } from "../services/productService";
import { Modal } from "../components/common/Modal";
import { ConditionBadge, ExchangeBadge } from "../components/common/Badge";
import { Upload, X, Eye, Check, AlertCircle, Loader2 } from "lucide-react";
import { CATEGORIES, BRANDS, SIZES, CONDITIONS, COLORS } from "../data/categories";
import { validateImageBatch, compressAndResizeImage, MAX_BATCH_IMAGE_COUNT } from "../utils/imageSecurity";

export const SellPage = () => {
  const navigate = useNavigate();
  const { addListing } = useListings();

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    brand: "Zara",
    category: "tops-shirts",
    gender: "unisex",
    size: "M",
    color: "Beige / Cream",
    material: "100% Linen / Cotton",
    condition: "Like New",
    conditionNote: "",
    price: "",
    originalPrice: "",
    description: "",
    deliveryAvailable: true,
    isExchangeable: true,
    exchangeWishlist: ""
  });

  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [isProcessingImages, setIsProcessingImages] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleImageUpload = async (e) => {
    setError("");
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const remainingSlots = MAX_BATCH_IMAGE_COUNT - images.length;
    if (remainingSlots <= 0) {
      setError(`Maximum limit reached. You can only attach up to ${MAX_BATCH_IMAGE_COUNT} images per listing.`);
      return;
    }

    // Validate MIME types, extensions, size (rejecting SVG and executable files)
    const validation = validateImageBatch(files, remainingSlots);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    setIsProcessingImages(true);
    try {
      // Downscale and compress each image via Canvas before storing to prevent QuotaExceededError
      const compressedUrls = await Promise.all(
        validation.validFiles.map(file => compressAndResizeImage(file, 800, 1000, 0.78))
      );
      setImages(prev => [...prev, ...compressedUrls]);
    } catch (err) {
      setError(`Image processing error: ${err.message}`);
    } finally {
      setIsProcessingImages(false);
      e.target.value = "";
    }
  };

  const removeImage = (idx) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
  };

  const validate = () => {
    if (!formData.name.trim()) return "Garment title is required.";
    const priceNum = Number(formData.price);
    if (isNaN(priceNum) || priceNum <= 0) return "Please set a valid positive listing price (greater than ₹0).";
    if (formData.originalPrice && (isNaN(Number(formData.originalPrice)) || Number(formData.originalPrice) <= 0)) {
      return "Original price must be a valid positive number if provided.";
    }
    if (images.length === 0) return "Please upload at least one garment photo.";
    return null;
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice) || Number(formData.price) * 2,
        discount: formData.originalPrice ? Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100) : 50,
        images: images.length > 0 ? images : ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80"],
        categoryName: CATEGORIES.find(c => c.id === formData.category)?.name || "Clothing"
      };

      // Save to listing context & product service
      addListing(payload, "Active");
      await productService.createProduct(payload);

      setIsSuccess(true);
      setTimeout(() => {
        navigate("/my-listings");
      }, 1500);
    } catch (saveErr) {
      setError(`Failed to publish listing: ${saveErr.message || "Browser storage quota reached."}`);
    }
  };

  const handleSaveDraft = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError("Please provide at least a title for the draft.");
      return;
    }

    try {
      const payload = {
        ...formData,
        price: Number(formData.price) || 0,
        originalPrice: Number(formData.originalPrice) || 0,
        discount: 0,
        images: images.length > 0 ? images : ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80"],
        categoryName: CATEGORIES.find(c => c.id === formData.category)?.name || "Clothing"
      };

      addListing(payload, "Draft");
      navigate("/my-listings");
    } catch (draftErr) {
      setError(`Failed to save draft: ${draftErr.message || "Browser storage quota reached."}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="pb-4 border-b border-border">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">Circulate Your Closet</span>
        <h1 className="font-serif text-3xl font-bold text-dark mt-1">List a Garment</h1>
        <p className="text-xs text-dark-muted mt-1">
          Give your unworn luxury and high-street pieces a second cycle.
        </p>
      </div>

      {isSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4" />
          Listing published successfully! Redirecting to your listings...
        </div>
      )}

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded text-rose-700 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      <form onSubmit={handlePublish} className="bg-white border border-border p-6 sm:p-8 rounded-sm shadow-subtle space-y-8">
        
        {/* Photos */}
        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-dark">
            1. Garment Photography (Multiple Angles) *
          </label>
          <div className="border-2 border-dashed border-border rounded-md p-8 text-center hover:border-primary transition-colors bg-secondary/40">
            <input
              type="file"
              id="sell-photos-upload"
              multiple
              accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
              onChange={handleImageUpload}
              disabled={isProcessingImages || images.length >= MAX_BATCH_IMAGE_COUNT}
              className="hidden"
            />
            <label htmlFor="sell-photos-upload" className="cursor-pointer flex flex-col items-center">
              {isProcessingImages ? (
                <Loader2 className="w-8 h-8 text-primary mb-2 animate-spin stroke-[1.5]" />
              ) : (
                <Upload className="w-8 h-8 text-primary mb-2 stroke-[1.5]" />
              )}
              <span className="text-xs font-semibold text-dark">
                {isProcessingImages ? "Compressing & Securing Garment Photos..." : "Upload High-Resolution Photos"}
              </span>
              <span className="text-[11px] text-dark-muted mt-1">
                JPEG, PNG, WebP only (max 5 MB each, up to 5 photos). SVG/scripts strictly rejected.
              </span>
            </label>
          </div>

          {/* Photo Previews */}
          {images.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-2">
              {images.map((img, i) => (
                <div key={i} className="relative w-24 h-32 rounded border border-border overflow-hidden">
                  <img src={img} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 p-1 bg-black/70 text-white rounded-full hover:bg-black"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Essential Information */}
        <div className="space-y-4 pt-4 border-t border-border">
          <h2 className="text-xs font-bold uppercase tracking-wider text-dark">2. Garment Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1 sm:col-span-2">
              <label className="font-semibold uppercase tracking-wider text-dark">Listing Title *</label>
              <input
                type="text"
                placeholder="e.g. Massimo Dutti Structured Linen Blazer"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2.5 bg-secondary border border-border rounded-sm focus:outline-none focus:border-primary font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold uppercase tracking-wider text-dark">Brand *</label>
              <select
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="w-full p-2.5 bg-secondary border border-border rounded-sm"
              >
                {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold uppercase tracking-wider text-dark">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-2.5 bg-secondary border border-border rounded-sm"
              >
                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold uppercase tracking-wider text-dark">Gender Target</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full p-2.5 bg-secondary border border-border rounded-sm capitalize"
              >
                <option value="unisex">Unisex</option>
                <option value="women">Women</option>
                <option value="men">Men</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold uppercase tracking-wider text-dark">Size *</label>
              <select
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                className="w-full p-2.5 bg-secondary border border-border rounded-sm"
              >
                {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold uppercase tracking-wider text-dark">Color *</label>
              <select
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-full p-2.5 bg-secondary border border-border rounded-sm"
              >
                {COLORS.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold uppercase tracking-wider text-dark">Primary Material</label>
              <input
                type="text"
                placeholder="e.g. 100% Organic Cotton"
                value={formData.material}
                onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                className="w-full p-2.5 bg-secondary border border-border rounded-sm"
              />
            </div>
          </div>
        </div>

        {/* Condition Assessment */}
        <div className="space-y-3 pt-4 border-t border-border">
          <label className="block text-xs font-bold uppercase tracking-wider text-dark">
            3. Condition Assessment *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CONDITIONS.filter(c => c.id !== "all").map((cond) => (
              <label
                key={cond.id}
                className={`p-3 rounded border cursor-pointer transition-all ${
                  formData.condition === cond.id
                    ? "border-primary bg-primary-soft/40 shadow-xs"
                    : "border-border hover:border-dark-muted bg-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="condition"
                    value={cond.id}
                    checked={formData.condition === cond.id}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                    className="accent-primary"
                  />
                  <div>
                    <span className="text-xs font-bold text-dark block">{cond.label}</span>
                    <span className="text-[11px] text-dark-muted block">{cond.desc}</span>
                  </div>
                </div>
              </label>
            ))}
          </div>

          <div className="space-y-1 pt-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-dark">Condition Notes & Nuances</label>
            <input
              type="text"
              placeholder="e.g. Minor hem fade; buttons intact; worn twice."
              value={formData.conditionNote}
              onChange={(e) => setFormData({ ...formData, conditionNote: e.target.value })}
              className="w-full text-xs p-2.5 bg-secondary border border-border rounded-sm"
            />
          </div>
        </div>

        {/* Pricing & Exchange Options */}
        <div className="space-y-4 pt-4 border-t border-border">
          <h2 className="text-xs font-bold uppercase tracking-wider text-dark">4. Pricing & Circular Options</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold uppercase tracking-wider text-dark">Selling Price (₹) *</label>
              <input
                type="number"
                min="100"
                step="50"
                placeholder="2490"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full p-2.5 bg-secondary border border-border rounded-sm font-bold text-dark"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold uppercase tracking-wider text-dark">Original Retail Price (₹)</label>
              <input
                type="number"
                min="100"
                step="50"
                placeholder="5990"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                className="w-full p-2.5 bg-secondary border border-border rounded-sm"
              />
            </div>
          </div>

          {/* Exchange availability checkbox */}
          <div className="p-4 bg-secondary rounded border border-border space-y-3">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="block text-xs font-bold text-dark">Enable Clothing Exchange</span>
                <span className="block text-[11px] text-dark-muted">Allow buyers to propose swapping their wardrobe items for this piece.</span>
              </div>
              <input
                type="checkbox"
                checked={formData.isExchangeable}
                onChange={(e) => setFormData({ ...formData, isExchangeable: e.target.checked })}
                className="w-4 h-4 accent-primary rounded cursor-pointer"
              />
            </label>

            {formData.isExchangeable && (
              <div className="space-y-1 pt-2 border-t border-border/60">
                <label className="block text-[11px] font-semibold text-dark">Exchange Wishlist (What are you looking for?)</label>
                <input
                  type="text"
                  placeholder="e.g. Open to trade for tailored trousers in Size S or raw denim."
                  value={formData.exchangeWishlist}
                  onChange={(e) => setFormData({ ...formData, exchangeWishlist: e.target.value })}
                  className="w-full text-xs p-2 bg-white border border-border rounded-sm"
                />
              </div>
            )}
          </div>
        </div>

        {/* Narrative Description */}
        <div className="space-y-2 pt-4 border-t border-border">
          <label className="block text-xs font-bold uppercase tracking-wider text-dark">
            5. Garment Story / Detailed Description
          </label>
          <textarea
            rows={4}
            placeholder="Share fit notes, styling tips, occasions worn, or why you are cycling this piece out..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full text-xs p-3 bg-secondary border border-border rounded-sm focus:outline-none focus:border-primary leading-relaxed"
          />
        </div>

        {/* Submit Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-border">
          <button
            type="button"
            onClick={() => setPreviewOpen(true)}
            className="luxury-btn border border-border px-4 py-2.5 rounded-sm text-xs font-semibold text-dark hover:bg-secondary flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" /> Preview Listing
          </button>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="px-4 py-2.5 rounded-sm text-xs font-semibold text-dark-muted hover:text-dark border border-border"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="luxury-btn luxury-btn-primary px-7 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider"
            >
              Publish to Marketplace
            </button>
          </div>
        </div>

      </form>

      {/* Preview Listing Modal */}
      <Modal isOpen={previewOpen} onClose={() => setPreviewOpen(false)} title="Listing Preview">
        <div className="space-y-4">
          <div className="aspect-fashion w-full rounded bg-secondary overflow-hidden">
            <img
              src={images[0] || "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80"}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="text-xs font-bold uppercase text-primary">{formData.brand}</span>
            <h3 className="font-serif text-xl font-bold text-dark">{formData.name || "Untitled Garment"}</h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xl font-bold text-dark">₹{Number(formData.price || 0).toLocaleString("en-IN")}</span>
              <ConditionBadge condition={formData.condition} />
              {formData.isExchangeable && <ExchangeBadge />}
            </div>
            <p className="text-xs text-dark-muted mt-2 leading-relaxed">{formData.description || "No description provided."}</p>
          </div>
        </div>
      </Modal>

    </div>
  );
};
