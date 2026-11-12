import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productService } from "../services/productService";
import { ExchangeRequestModal } from "../components/exchange/ExchangeRequestModal";
import { ConditionBadge, ExchangeBadge } from "../components/common/Badge";
import { ArrowLeftRight, RefreshCw, Sparkles, Filter, Search } from "lucide-react";
import { CATEGORIES } from "../data/categories";

export const ExchangeMarketplacePage = () => {
  const [exchangeItems, setExchangeItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [targetProductForExchange, setTargetProductForExchange] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      const items = await productService.getProducts({ exchangeOnly: true });
      if (selectedCategory !== "all") {
        setExchangeItems(items.filter(i => i.category === selectedCategory));
      } else {
        setExchangeItems(items);
      }
    };
    load();
  }, [selectedCategory]);

  const handleOpenProposal = (item) => {
    setTargetProductForExchange(item);
    setModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Editorial Header Banner */}
      <div className="bg-primary text-secondary p-8 sm:p-12 rounded-sm shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold uppercase tracking-widest text-accent">
            <RefreshCw className="w-3.5 h-3.5" />
            Zero-Cash Wardrobe Swapping
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
            The Exchange Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-secondary/80 leading-relaxed">
            Trade clothes directly without spending money. Select any piece below, offer a garment from your own Digital Wardrobe, add an optional cash adjustment if desired, and complete the swap.
          </p>
        </div>

        <Link
          to="/exchange/manage"
          className="luxury-btn bg-accent text-dark hover:bg-accent-light px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center gap-2 flex-shrink-0"
        >
          <ArrowLeftRight className="w-4 h-4" />
          Manage My Proposals
        </Link>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors flex-shrink-0 ${
            selectedCategory === "all" ? "bg-primary text-white" : "bg-white border border-border text-dark hover:bg-secondary"
          }`}
        >
          All Exchangeable Pieces
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors flex-shrink-0 ${
              selectedCategory === c.id ? "bg-primary text-white" : "bg-white border border-border text-dark hover:bg-secondary"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {exchangeItems.map((item) => (
          <div key={item.id} className="bg-white border border-border rounded-sm overflow-hidden shadow-subtle hover:shadow-card transition-all flex flex-col justify-between">
            <div className="relative aspect-fashion bg-secondary">
              <img
                src={item.images ? item.images[0] : item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                <ConditionBadge condition={item.condition} />
                <ExchangeBadge />
              </div>
            </div>

            <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-dark-muted">
                  <span className="font-bold text-primary uppercase">{item.brand}</span>
                  <span className="bg-secondary px-2 py-0.5 rounded text-[11px] font-medium border border-border">Size {item.size}</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-dark">{item.name}</h3>
                
                {/* Seller Exchange Wishlist */}
                {item.exchangeWishlist && (
                  <p className="text-[11px] text-dark-muted bg-secondary/80 p-2.5 rounded border border-border/60 italic">
                    <strong>Seller Seeks:</strong> "{item.exchangeWishlist}"
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-border flex items-center gap-2">
                <Link
                  to={`/product/${item.id}`}
                  className="flex-1 px-3 py-2 border border-border text-dark text-xs font-semibold rounded-sm hover:bg-secondary text-center"
                >
                  View Garment
                </Link>
                <button
                  onClick={() => handleOpenProposal(item)}
                  className="flex-1 luxury-btn luxury-btn-primary py-2 text-xs font-bold uppercase tracking-wider rounded-sm flex items-center justify-center gap-1.5"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                  Swap Clothes
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Exchange Proposal Modal */}
      {targetProductForExchange && (
        <ExchangeRequestModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setTargetProductForExchange(null);
          }}
          targetProduct={targetProductForExchange}
        />
      )}

    </div>
  );
};
