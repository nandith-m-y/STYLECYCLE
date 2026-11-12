import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { useWardrobe } from "../../context/WardrobeContext";
import { useExchange } from "../../context/ExchangeContext";
import { ArrowLeftRight, Check, AlertCircle } from "lucide-react";

export const ExchangeRequestModal = ({ isOpen, onClose, targetProduct }) => {
  const { wardrobe } = useWardrobe();
  const { sendExchangeRequest } = useExchange();

  const [selectedWardrobeItemId, setSelectedWardrobeItemId] = useState(wardrobe[0]?.id || "");
  const [cashDifference, setCashDifference] = useState(0);
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!targetProduct) return null;

  const selectedItem = wardrobe.find(w => w.id === selectedWardrobeItemId) || wardrobe[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedItem) return;

    sendExchangeRequest({
      requestedItem: targetProduct,
      offeredItem: selectedItem,
      cashDifference: Number(cashDifference) || 0,
      message: message.trim() || `Hi! I would like to propose exchanging my ${selectedItem.name} (${selectedItem.brand}) for your ${targetProduct.name}.`
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Propose Circular Exchange" maxWidth="max-w-2xl">
      {isSubmitted ? (
        <div className="py-12 text-center space-y-3">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-7 h-7" />
          </div>
          <h4 className="font-serif text-2xl font-medium text-dark">Exchange Request Sent!</h4>
          <p className="text-sm text-dark-muted max-w-md mx-auto">
            The seller has received your circular proposal. You will be notified in your Exchange Management dashboard once they review your offer.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Comparison Preview (Target Item <-> Offered Item) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-secondary p-4 rounded-sm border border-border">
            {/* Target Item (What you want) */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-dark-muted">
                You Want to Receive:
              </span>
              <div className="flex gap-3 bg-white p-2.5 rounded border border-border">
                <img
                  src={targetProduct.images ? targetProduct.images[0] : targetProduct.image}
                  alt={targetProduct.name}
                  className="w-16 h-20 object-cover rounded-sm flex-shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-primary uppercase">{targetProduct.brand}</p>
                  <p className="text-xs font-medium text-dark truncate">{targetProduct.name}</p>
                  <p className="text-xs text-dark-muted mt-1">Size {targetProduct.size} &bull; ₹{targetProduct.price.toLocaleString("en-IN")}</p>
                </div>
              </div>
            </div>

            {/* Offered Item (What you give) */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-dark-muted">
                You Are Offering:
              </span>
              {selectedItem ? (
                <div className="flex gap-3 bg-white p-2.5 rounded border border-border">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="w-16 h-20 object-cover rounded-sm flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-primary uppercase">{selectedItem.brand}</p>
                    <p className="text-xs font-medium text-dark truncate">{selectedItem.name}</p>
                    <p className="text-xs text-dark-muted mt-1">Size {selectedItem.size} &bull; {selectedItem.color}</p>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-white rounded border border-dashed border-border text-center text-xs text-dark-muted">
                  No wardrobe item selected
                </div>
              )}
            </div>
          </div>

          {/* Select Wardrobe Item */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-dark">
              Select an Item from Your Digital Wardrobe:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-1 border border-border rounded-sm">
              {wardrobe.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedWardrobeItemId(item.id)}
                  className={`p-2 rounded border cursor-pointer flex items-center gap-2 transition-all ${
                    selectedWardrobeItemId === item.id
                      ? "border-primary bg-primary-soft/40 shadow-xs"
                      : "border-border hover:border-dark-muted bg-white"
                  }`}
                >
                  <img src={item.image} alt={item.name} className="w-10 h-12 object-cover rounded-sm flex-shrink-0" />
                  <div className="min-w-0 text-left">
                    <p className="text-[11px] font-semibold text-dark truncate">{item.name}</p>
                    <p className="text-[10px] text-dark-muted truncate">{item.brand} &bull; {item.size}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Optional Cash Difference */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-dark">
                Optional Cash Difference (₹):
              </label>
              <input
                type="number"
                min="0"
                step="50"
                value={cashDifference}
                onChange={(e) => setCashDifference(e.target.value)}
                placeholder="e.g. 500 if your item has lower value"
                className="w-full text-xs p-2.5 bg-secondary border border-border rounded-sm focus:outline-none focus:border-primary"
              />
              <p className="text-[11px] text-dark-muted">
                Add an optional sweetener if the requested garment has higher market retail value.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-dark">
                Personal Pitch / Condition Note:
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Mention why this trade is a win-win, garment condition details, or fit nuances..."
                className="w-full text-xs p-2.5 bg-secondary border border-border rounded-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-dark-muted hover:text-dark"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedItem}
              className="luxury-btn luxury-btn-primary px-6 py-2.5 rounded-sm text-xs uppercase tracking-wider font-semibold disabled:opacity-50"
            >
              Send Exchange Proposal
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
