import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { productService } from "../services/productService";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { calculateFitRecommendation } from "../services/fitmatchService";
import { ExchangeRequestModal } from "../components/exchange/ExchangeRequestModal";
import { ConditionBadge, ExchangeBadge, SustainableBadge } from "../components/common/Badge";
import { 
  Heart, 
  ShoppingBag, 
  ArrowLeftRight, 
  Ruler, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Star, 
  Check, 
  Sparkles,
  ChevronLeft
} from "lucide-react";

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [exchangeModalOpen, setExchangeModalOpen] = useState(false);
  const [addedToast, setAddedToast] = useState(false);
  const [fitMatchPreviewOpen, setFitMatchPreviewOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const item = await productService.getProductById(id);
        setProduct(item);
        setSelectedSize(item.size || "M");
      } catch (err) {
        console.error("Failed to load product", err);
      }
    };
    load();
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto" />
        <p className="text-xs text-dark-muted mt-3">Loading piece details...</p>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  // Calculate FitMatch preview based on current user measurements
  const fitRecommendation = user?.measurements ? calculateFitRecommendation({
    measurements: user.measurements,
    brand: product.brand,
    category: product.category === "jeans-trousers" ? "bottoms" : "tops",
    preferredFit: user.measurements.preferredFit || "Regular"
  }) : null;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, 1);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, 1);
    navigate("/checkout");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Back button */}
      <div>
        <Link
          to="/marketplace"
          className="inline-flex items-center gap-1.5 text-xs text-dark-muted hover:text-primary transition-colors font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Marketplace
        </Link>
      </div>

      {/* Main Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left: Multi-Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-fashion w-full overflow-hidden rounded-sm bg-secondary border border-border shadow-subtle relative">
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <ConditionBadge condition={product.condition} />
              {product.isExchangeable && <ExchangeBadge />}
            </div>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-24 rounded-sm overflow-hidden border-2 flex-shrink-0 transition-all ${
                    selectedImage === idx ? "border-primary shadow-xs" : "border-border opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Actions */}
        <div className="space-y-6">
          
          {/* Brand & Title */}
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                {product.brand}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-amber-600 font-semibold bg-amber-50/80 px-2.5 py-1 rounded-full border border-amber-200/60">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 flex-shrink-0" />
                <span>{product.rating || "4.8"}</span>
                <span className="text-dark-muted font-normal">({product.reviewsCount || 12} reviews)</span>
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-dark mt-2 leading-tight tracking-tight">
              {product.name}
            </h1>

            {/* Condition note */}
            {product.conditionNote && (
              <p className="text-xs text-dark-muted mt-3 italic bg-secondary p-3 rounded-sm border border-border leading-relaxed">
                <strong className="text-dark font-medium not-italic">Seller Condition Note:</strong> "{product.conditionNote}"
              </p>
            )}
          </div>

          {/* Pricing - Perfectly Leveled with Official Rupee Symbol */}
          <div className="flex items-center gap-3 pb-4 border-b border-border flex-wrap">
            <span className="text-3xl font-bold text-dark tracking-tight leading-none">₹{product.price.toLocaleString("en-IN")}</span>
            {product.originalPrice && (
              <span className="text-base text-dark-muted line-through leading-none">₹{product.originalPrice.toLocaleString("en-IN")}</span>
            )}
            {product.discount > 0 && (
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-sm border border-emerald-200 leading-none">
                Save {product.discount}% OFF Retail
              </span>
            )}
          </div>

          {/* FitMatch Inline Size Helper */}
          {fitRecommendation && (
            <div className="bg-primary-soft/60 border border-primary/20 p-4 rounded-sm space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold text-primary uppercase tracking-wide">
                    FitMatch Intelligence:
                  </span>
                </div>
                <span className="text-xs font-bold text-primary bg-white px-2 py-0.5 rounded border border-primary/20">
                  {fitRecommendation.confidenceScore}% Match
                </span>
              </div>
              <p className="text-xs text-dark/90 leading-relaxed">
                Your profile indicates <strong>Size {fitRecommendation.recommendedSize}</strong> will fit you best for {product.brand}'s cut.
              </p>
              <button
                type="button"
                onClick={() => setFitMatchPreviewOpen(!fitMatchPreviewOpen)}
                className="text-xs font-semibold text-primary underline"
              >
                {fitMatchPreviewOpen ? "Hide Breakdown" : "View Dimensional Comparison"}
              </button>

              {fitMatchPreviewOpen && (
                <div className="pt-2 text-xs space-y-1 text-dark-muted border-t border-primary/20">
                  <p>{fitRecommendation.explanation}</p>
                </div>
              )}
            </div>
          )}

          {/* Size & Color Info */}
          <div className="space-y-3">
            <div className="flex justify-between text-xs">
              <span className="font-semibold uppercase tracking-wider text-dark">Available Size:</span>
              <span className="font-bold text-primary">Tag Size: {product.size}</span>
            </div>
            <div className="flex gap-2">
              <span className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-sm border border-primary">
                Size {product.size}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 luxury-btn luxury-btn-primary py-3.5 rounded-sm text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                {addedToast ? "Added to Cart!" : "Add to Cart"}
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 luxury-btn luxury-btn-accent py-3.5 rounded-sm text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
              >
                Buy Now
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 rounded-sm border transition-colors ${
                  isWishlisted
                    ? "border-rose-400 text-rose-600 bg-rose-50"
                    : "border-border text-dark-muted hover:text-dark hover:border-dark"
                }`}
                title={isWishlisted ? "Saved in Wishlist" : "Save to Wishlist"}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-rose-600" : ""}`} />
              </button>
            </div>

            {/* Request Exchange Button (if exchangeable) */}
            {product.isExchangeable && (
              <button
                onClick={() => setExchangeModalOpen(true)}
                className="w-full luxury-btn luxury-btn-outline py-3 rounded-sm text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <ArrowLeftRight className="w-4 h-4" />
                Request Circular Exchange (Trade Clothes)
              </button>
            )}
          </div>

          {/* Seller Snapshot */}
          {product.seller && (
            <div className="flex items-center justify-between p-4 bg-secondary rounded-sm border border-border">
              <div className="flex items-center gap-3">
                <img
                  src={product.seller.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                  alt={product.seller.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-dark">{product.seller.name}</span>
                    {product.seller.verified && (
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                        Verified Seller
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-dark-muted">
                    {product.seller.city} &bull; {product.seller.salesCount} garments cycled &bull; ★ {product.seller.rating}
                  </p>
                </div>
              </div>
              <Link to="/marketplace" className="text-xs text-primary font-semibold hover:underline">
                View Closet
              </Link>
            </div>
          )}

          {/* Description & Specs Tabs */}
          <div className="space-y-4 pt-4 border-t border-border text-xs leading-relaxed">
            <h4 className="font-semibold uppercase tracking-wider text-dark">Garment Narrative & Details</h4>
            <p className="text-dark-muted">{product.description}</p>

            {product.specifications && (
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/60">
                {Object.entries(product.specifications).map(([k, v]) => (
                  <div key={k} className="py-1">
                    <span className="text-dark-muted">{k}: </span>
                    <span className="font-medium text-dark">{v}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Delivery & Protection Guarantees */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border text-xs text-dark-muted">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-primary flex-shrink-0" />
              <span>Doorstep Delivery (3-5 Days)</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" />
              <span>STYLECYCLE Buyer Protection</span>
            </div>
          </div>

        </div>

      </div>

      {/* Exchange Request Modal */}
      <ExchangeRequestModal
        isOpen={exchangeModalOpen}
        onClose={() => setExchangeModalOpen(false)}
        targetProduct={product}
      />

    </div>
  );
};
