import React, { useState } from "react";
import { orderService } from "../services/orderService";
import { EmptyState } from "../components/common/EmptyState";
import { Package, Truck, CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const OrderHistoryPage = () => {
  const [orders] = useState(() => orderService.getOrders());

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <EmptyState
          icon={Package}
          title="No Orders Found"
          description="You haven't placed any circular fashion orders yet. Explore the marketplace to find curated sustainable drops."
          actionText="Browse Marketplace"
          actionLink="/marketplace"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="pb-4 border-b border-border">
        <h1 className="font-serif text-3xl font-bold text-dark">Order History</h1>
        <p className="text-xs text-dark-muted mt-1">Track and inspect your circular fashion acquisitions</p>
      </div>

      <div className="space-y-6">
        {orders.map((ord) => (
          <div key={ord.id} className="bg-white border border-border rounded-sm shadow-subtle p-6 space-y-4">
            
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-dark text-sm">{ord.id}</span>
                <p className="text-dark-muted">Placed on {ord.date} &bull; Payment via {ord.paymentMethod}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-bold text-dark text-sm">₹{ord.totalAmount.toLocaleString("en-IN")}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  ord.status === "Delivered"
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-amber-50 text-amber-800 border border-amber-200"
                }`}>
                  {ord.status}
                </span>
              </div>
            </div>

            {/* Tracking Banner */}
            <div className="flex items-center gap-2 p-3 bg-secondary rounded text-xs text-dark-muted">
              <Truck className="w-4 h-4 text-primary flex-shrink-0" />
              <span>Tracking Number: <strong className="text-dark">{ord.trackingNumber}</strong> (Express BlueDart Circular Cargo)</span>
            </div>

            {/* Items */}
            <div className="divide-y divide-border/60">
              {ord.items?.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image || "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=150&q=80"}
                      alt={item.name}
                      className="w-12 h-16 object-cover rounded-sm flex-shrink-0"
                    />
                    <div>
                      <p className="text-xs font-bold text-primary uppercase">{item.brand}</p>
                      <p className="text-xs font-semibold text-dark">{item.name}</p>
                      <p className="text-[11px] text-dark-muted">Size: {item.size} &bull; Qty: {item.quantity || 1}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-dark">₹{(item.price * (item.quantity || 1)).toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
