import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { EmptyState } from "../components/common/EmptyState";
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft, ShieldCheck } from "lucide-react";

export const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, subtotal, shippingFee, total } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <EmptyState
          icon={ShoppingBag}
          title="Your Shopping Bag is Empty"
          description="Explore our curated circular marketplace to find sustainable designer pieces and wardrobe staples."
          actionText="Explore Marketplace"
          actionLink="/marketplace"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="pb-4 border-b border-border">
        <h1 className="font-serif text-3xl font-bold text-dark">Shopping Bag</h1>
        <p className="text-xs text-dark-muted mt-1">{cart.length} unique pieces reserved</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-border rounded-sm shadow-subtle divide-y divide-border">
            {cart.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="p-4 sm:p-6 flex gap-4 items-center">
                <Link to={`/product/${item.id}`} className="w-20 h-28 rounded-sm overflow-hidden bg-secondary flex-shrink-0">
                  <img
                    src={item.images ? item.images[0] : item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                <div className="flex-1 min-w-0 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    {item.brand}
                  </span>
                  <Link to={`/product/${item.id}`} className="block">
                    <h3 className="text-sm font-semibold text-dark truncate hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-dark-muted">Size: <span className="font-semibold text-dark">{item.selectedSize}</span> &bull; Condition: {item.condition}</p>
                  
                  <div className="flex items-center gap-4 pt-3">
                    {/* Qty Controls */}
                    <div className="flex items-center border border-border rounded-sm bg-secondary text-xs">
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                        className="px-2.5 py-1 text-dark-muted hover:text-dark font-bold"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 font-semibold text-dark">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                        className="px-2.5 py-1 text-dark-muted hover:text-dark font-bold"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id, item.selectedSize)}
                      className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Remove
                    </button>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className="text-sm sm:text-base font-bold text-dark">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                  {item.originalPrice && (
                    <span className="block text-[11px] text-dark-muted line-through">
                      ₹{(item.originalPrice * item.quantity).toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2">
            <Link
              to="/marketplace"
              className="text-xs font-semibold text-primary hover:text-primary-dark flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="bg-white border border-border rounded-sm p-6 shadow-subtle space-y-6">
          <h2 className="font-serif text-lg font-bold text-dark pb-3 border-b border-border">
            Order Summary
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-dark-muted">
              <span>Subtotal:</span>
              <span className="font-semibold text-dark">₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-dark-muted">
              <span>Standard Insured Shipping:</span>
              <span>{shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${shippingFee}`}</span>
            </div>
            {shippingFee > 0 && (
              <p className="text-[11px] text-primary bg-primary-soft p-2 rounded">
                Add ₹{(3000 - subtotal).toLocaleString("en-IN")} more to qualify for Free Shipping!
              </p>
            )}
            <div className="flex justify-between text-base font-bold text-dark pt-3 border-t border-border">
              <span>Estimated Total:</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full luxury-btn luxury-btn-primary py-3.5 rounded-sm text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
          >
            Proceed to Checkout <ArrowRight className="w-4 h-4" />
          </button>

          <div className="pt-2 text-[11px] text-dark-muted flex items-center gap-2 justify-center">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>Encrypted Checkout &bull; Verified Authenticity</span>
          </div>
        </div>

      </div>

    </div>
  );
};
