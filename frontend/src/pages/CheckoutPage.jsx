import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { orderService } from "../services/orderService";
import { CheckCircle2, ShieldCheck, ArrowRight, CreditCard, Banknote, Smartphone, AlertTriangle } from "lucide-react";

export const CheckoutPage = () => {
  const { cart, subtotal, shippingFee, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Form State
  const [address, setAddress] = useState({
    name: user?.name || "Tara Deshmukh",
    phone: user?.phone || "+91 98200 45678",
    email: user?.email || "tara.style@example.com",
    street: "Flat 402, Sea Green Apartments, Worli Sea Face",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400030"
  });

  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [orderComplete, setOrderComplete] = useState(null);

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent double submission
    if (cart.length === 0) {
      setSubmissionError("Your cart is empty. Add items before placing an order.");
      return;
    }

    setSubmissionError("");
    setIsSubmitting(true);

    // Generate unique client idempotency token for this attempt
    const idempotencyKey = `IDEMP-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    setTimeout(() => {
      try {
        const placedOrder = orderService.createOrder({
          items: cart,
          totalAmount: total,
          shippingAddress: address,
          paymentMethod,
          idempotencyKey,
          buyerId: user?.id || "usr-demo-guest"
        });
        clearCart();
        setIsSubmitting(false);
        setOrderComplete(placedOrder);
      } catch (err) {
        setIsSubmitting(false);
        setSubmissionError(err.message || "An error occurred while placing the order.");
      }
    }, 1000);
  };

  if (orderComplete) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-primary">Thank You For Circulating</span>
          <h1 className="font-serif text-3xl font-bold text-dark mt-1">Order Confirmed!</h1>
          <p className="text-xs text-dark-muted mt-2">
            Order Reference: <strong className="text-dark">{orderComplete.id}</strong> &bull; Tracking ID: {orderComplete.trackingNumber}
          </p>
        </div>

        {/* SEC-REMED: Clear Phase 1 Mock Payment Notice */}
        <div className="bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-sm text-left text-xs space-y-1">
          <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-[11px] text-amber-800">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>Demonstration Checkout Notice</span>
          </div>
          <p className="text-amber-800">
            Payment Status: <strong className="font-semibold">{orderComplete.paymentStatus}</strong>
          </p>
          <p className="text-[11px] text-amber-700 leading-relaxed">
            {orderComplete.verificationDisclaimer || "This transaction is a simulated client prototype. No actual payment was processed or verified by a bank gateway."}
          </p>
        </div>

        <div className="bg-white p-5 rounded-sm border border-border text-left text-xs space-y-2">
          <p className="font-semibold text-dark">Delivery Address:</p>
          <p className="text-dark-muted">{orderComplete.shippingAddress.name}</p>
          <p className="text-dark-muted">{orderComplete.shippingAddress.street}, {orderComplete.shippingAddress.city} - {orderComplete.shippingAddress.pincode}</p>
          <p className="text-dark-muted">Mode: {orderComplete.paymentMethod} &bull; Total: ₹{orderComplete.totalAmount.toLocaleString("en-IN")}</p>
        </div>

        <div className="flex justify-center gap-4">
          <Link
            to="/orders"
            className="luxury-btn luxury-btn-primary px-6 py-2.5 rounded-sm text-xs uppercase tracking-wider font-semibold"
          >
            View Order History
          </Link>
          <Link
            to="/marketplace"
            className="luxury-btn luxury-btn-outline px-6 py-2.5 rounded-sm text-xs uppercase tracking-wider font-semibold"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="pb-4 border-b border-border">
        <h1 className="font-serif text-3xl font-bold text-dark">Checkout</h1>
        <p className="text-xs text-dark-muted mt-1">Insured doorstep dispatch across India</p>
      </div>

      {submissionError && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <span>{submissionError}</span>
        </div>
      )}

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        
        {/* Left: Address & Payment Methods */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Shipping Address */}
          <div className="bg-white border border-border p-6 rounded-sm shadow-subtle space-y-4">
            <h2 className="font-serif text-lg font-bold text-dark pb-2 border-b border-border">
              1. Delivery Address
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold uppercase tracking-wider text-dark">Full Name *</label>
                <input
                  type="text"
                  required
                  value={address.name}
                  onChange={(e) => setAddress({ ...address, name: e.target.value })}
                  className="w-full p-2.5 bg-secondary border border-border rounded-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold uppercase tracking-wider text-dark">Contact Phone *</label>
                <input
                  type="tel"
                  required
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  className="w-full p-2.5 bg-secondary border border-border rounded-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="font-semibold uppercase tracking-wider text-dark">Street Address *</label>
                <input
                  type="text"
                  required
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  className="w-full p-2.5 bg-secondary border border-border rounded-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold uppercase tracking-wider text-dark">City *</label>
                <input
                  type="text"
                  required
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="w-full p-2.5 bg-secondary border border-border rounded-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold uppercase tracking-wider text-dark">Postal Code / PIN *</label>
                <input
                  type="text"
                  required
                  value={address.pincode}
                  onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                  className="w-full p-2.5 bg-secondary border border-border rounded-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="bg-white border border-border p-6 rounded-sm shadow-subtle space-y-4">
            <h2 className="font-serif text-lg font-bold text-dark pb-2 border-b border-border">
              2. Payment Mode (Phase 1 Mock Simulation)
            </h2>

            <div className="space-y-3">
              {[
                { id: "UPI", label: "Instant UPI (PhonePe, GPay, Paytm)", icon: Smartphone, desc: "Fastest zero-fee transfer" },
                { id: "Card", label: "Credit or Debit Card", icon: CreditCard, desc: "Visa, Mastercard, RuPay & Amex" },
                { id: "COD", label: "Cash on Delivery", icon: Banknote, desc: "Pay upon physical delivery inspect" }
              ].map((p) => {
                const Icon = p.icon;
                return (
                  <label
                    key={p.id}
                    className={`flex items-center justify-between p-4 rounded border cursor-pointer transition-all ${
                      paymentMethod === p.id
                        ? "border-primary bg-primary-soft/40 shadow-xs"
                        : "border-border hover:border-dark-muted bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={p.id}
                        checked={paymentMethod === p.id}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="accent-primary"
                      />
                      <div>
                        <span className="block text-xs font-bold text-dark">{p.label}</span>
                        <span className="block text-[11px] text-dark-muted">{p.desc}</span>
                      </div>
                    </div>
                    <Icon className="w-5 h-5 text-dark-muted" />
                  </label>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right: Order Summary */}
        <div className="bg-white border border-border rounded-sm p-6 shadow-subtle space-y-6">
          <h2 className="font-serif text-lg font-bold text-dark pb-3 border-b border-border">
            Review Order
          </h2>

          <div className="space-y-3 max-h-56 overflow-y-auto pr-1 divide-y divide-border/60">
            {cart.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="pt-2 first:pt-0 flex justify-between text-xs">
                <div>
                  <p className="font-medium text-dark truncate max-w-[160px]">{item.name}</p>
                  <p className="text-[11px] text-dark-muted">{item.brand} &bull; Size {item.selectedSize} (x{item.quantity})</p>
                </div>
                <span className="font-semibold text-dark">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-xs pt-3 border-t border-border">
            <div className="flex justify-between text-dark-muted">
              <span>Subtotal:</span>
              <span className="font-medium text-dark">₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-dark-muted">
              <span>Delivery Fee:</span>
              <span>{shippingFee === 0 ? "FREE" : `₹${shippingFee}`}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-dark pt-2 border-t border-border">
              <span>Total Payable:</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || cart.length === 0}
            className="w-full luxury-btn luxury-btn-primary py-3.5 rounded-sm text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Securing Order..." : `Place Order (₹${total.toLocaleString("en-IN")})`}
          </button>
        </div>

      </form>

    </div>
  );
};
