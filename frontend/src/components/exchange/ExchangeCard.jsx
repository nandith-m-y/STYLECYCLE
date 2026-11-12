import React from "react";
import { ArrowLeftRight, Check, X, Clock, MessageSquare } from "lucide-react";

export const ExchangeCard = ({ exchange, onAccept, onReject, onCancel }) => {
  const isIncoming = exchange.type === "incoming";
  const isPending = exchange.status === "Pending";

  const statusColors = {
    Pending: "bg-amber-50 text-amber-800 border-amber-200",
    Accepted: "bg-emerald-50 text-emerald-800 border-emerald-200",
    Rejected: "bg-rose-50 text-rose-800 border-rose-200",
    Cancelled: "bg-stone-100 text-stone-600 border-stone-200"
  };

  return (
    <div className="bg-white border border-border rounded-sm p-5 shadow-subtle space-y-4">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-border/70 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-dark">{exchange.id}</span>
          <span className="text-dark-muted">&bull; {exchange.createdAt}</span>
          <span className="capitalize px-2 py-0.5 rounded text-[11px] font-medium bg-secondary text-primary">
            {isIncoming ? "Incoming Offer" : "Outgoing Proposal"}
          </span>
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusColors[exchange.status] || "bg-stone-100"}`}>
          {exchange.status}
        </span>
      </div>

      {/* Garments Visual Swap */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* Item 1 */}
        <div className="flex items-center gap-3 p-3 bg-secondary/60 rounded border border-border/80">
          <img
            src={exchange.requestedItem?.images ? exchange.requestedItem.images[0] : (exchange.requestedItem?.image || "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=200&q=80")}
            alt={exchange.requestedItem?.name}
            className="w-14 h-18 object-cover rounded-sm flex-shrink-0"
          />
          <div className="min-w-0">
            <span className="text-[10px] uppercase font-bold tracking-wider text-dark-muted">
              {isIncoming ? "Your Listed Item" : "Requested Item"}
            </span>
            <p className="text-xs font-bold text-dark truncate">{exchange.requestedItem?.name}</p>
            <p className="text-xs text-dark-muted">{exchange.requestedItem?.brand} &bull; Size {exchange.requestedItem?.size}</p>
          </div>
        </div>

        {/* Item 2 */}
        <div className="flex items-center gap-3 p-3 bg-secondary/60 rounded border border-border/80">
          <img
            src={exchange.offeredItem?.image || "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=200&q=80"}
            alt={exchange.offeredItem?.name}
            className="w-14 h-18 object-cover rounded-sm flex-shrink-0"
          />
          <div className="min-w-0">
            <span className="text-[10px] uppercase font-bold tracking-wider text-dark-muted">
              {isIncoming ? "Offered by Requester" : "Your Offered Garment"}
            </span>
            <p className="text-xs font-bold text-dark truncate">{exchange.offeredItem?.name}</p>
            <p className="text-xs text-dark-muted">{exchange.offeredItem?.brand} &bull; Size {exchange.offeredItem?.size}</p>
          </div>
        </div>
      </div>

      {/* Optional Cash Difference & Message */}
      <div className="bg-secondary/40 p-3 rounded text-xs space-y-1.5 border border-border/60">
        {exchange.cashDifference > 0 && (
          <p className="text-dark font-medium">
            Cash Adjustment: <span className="text-emerald-700 font-bold">+₹{exchange.cashDifference}</span> offered with this garment.
          </p>
        )}
        {exchange.message && (
          <div className="flex items-start gap-1.5 text-dark-muted">
            <MessageSquare className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
            <p className="italic">"{exchange.message}"</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {isPending && (
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/70">
          {isIncoming ? (
            <>
              <button
                onClick={() => onReject(exchange.id)}
                className="px-3 py-1.5 border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-semibold rounded-sm transition-colors"
              >
                Decline Offer
              </button>
              <button
                onClick={() => onAccept(exchange.id)}
                className="luxury-btn luxury-btn-primary px-4 py-1.5 text-xs font-semibold rounded-sm flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                Accept Exchange
              </button>
            </>
          ) : (
            <button
              onClick={() => onCancel(exchange.id)}
              className="px-3 py-1.5 border border-border text-dark-muted hover:text-rose-600 text-xs font-semibold rounded-sm transition-colors"
            >
              Cancel Proposal
            </button>
          )}
        </div>
      )}
    </div>
  );
};
