import React from "react";
import { Filter, X, RotateCcw } from "lucide-react";
import { CATEGORIES, BRANDS, SIZES, CONDITIONS } from "../../data/categories";

export const ProductFilters = ({ filters, onFilterChange, onResetFilters, isMobile, onCloseMobile }) => {
  return (
    <div className="bg-white border border-border p-5 rounded-sm shadow-subtle space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-dark">Filters</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onResetFilters}
            className="text-xs text-dark-muted hover:text-primary flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
          {isMobile && (
            <button onClick={onCloseMobile} className="p-1 text-dark-muted hover:text-dark">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Exchangeable Only Toggle */}
      <div className="pt-1 pb-3 border-b border-border/70">
        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-xs font-semibold text-dark group-hover:text-primary">
            Exchangeable Items Only
          </span>
          <input
            type="checkbox"
            checked={!!filters.exchangeOnly}
            onChange={(e) => onFilterChange("exchangeOnly", e.target.checked)}
            className="w-4 h-4 accent-primary rounded cursor-pointer"
          />
        </label>
      </div>

      {/* Gender Segment */}
      <div className="space-y-2 pb-4 border-b border-border/70">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-dark-muted">Gender</h4>
        <div className="grid grid-cols-3 gap-1.5">
          {["all", "women", "men"].map((g) => (
            <button
              key={g}
              onClick={() => onFilterChange("gender", g)}
              className={`py-1.5 px-2 text-xs rounded-sm capitalize font-medium transition-colors ${
                (filters.gender || "all") === g
                  ? "bg-primary text-white"
                  : "bg-secondary text-dark hover:bg-border"
              }`}
            >
              {g === "all" ? "All" : g}
            </button>
          ))}
        </div>
      </div>

      {/* Category */}
      <div className="space-y-2 pb-4 border-b border-border/70">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-dark-muted">Category</h4>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          <label className="flex items-center gap-2 text-xs text-dark hover:text-primary cursor-pointer">
            <input
              type="radio"
              name="category"
              checked={!filters.category || filters.category === "all"}
              onChange={() => onFilterChange("category", "all")}
              className="accent-primary"
            />
            All Categories
          </label>
          {CATEGORIES.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2 text-xs text-dark hover:text-primary cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={filters.category === cat.id}
                onChange={() => onFilterChange("category", cat.id)}
                className="accent-primary"
              />
              {cat.name}
            </label>
          ))}
        </div>
      </div>

      {/* Condition */}
      <div className="space-y-2 pb-4 border-b border-border/70">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-dark-muted">Condition</h4>
        <div className="space-y-1.5">
          {CONDITIONS.map((c) => (
            <label key={c.id} className="flex items-center gap-2 text-xs text-dark hover:text-primary cursor-pointer">
              <input
                type="radio"
                name="condition"
                checked={(filters.condition || "all") === c.id}
                onChange={() => onFilterChange("condition", c.id)}
                className="accent-primary"
              />
              {c.label}
            </label>
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="space-y-2 pb-4 border-b border-border/70">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-dark-muted">Size</h4>
        <div className="grid grid-cols-3 gap-1.5">
          <button
            onClick={() => onFilterChange("size", "all")}
            className={`py-1 text-xs rounded-sm border font-medium ${
              (filters.size || "all") === "all"
                ? "bg-primary text-white border-primary"
                : "border-border text-dark hover:bg-secondary"
            }`}
          >
            All
          </button>
          {SIZES.map((sz) => (
            <button
              key={sz}
              onClick={() => onFilterChange("size", sz)}
              className={`py-1 text-xs rounded-sm border font-medium ${
                filters.size === sz
                  ? "bg-primary text-white border-primary"
                  : "border-border text-dark hover:bg-secondary"
              }`}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div className="space-y-2 pb-4 border-b border-border/70">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-dark-muted">Brand</h4>
        <select
          value={filters.brand || "all"}
          onChange={(e) => onFilterChange("brand", e.target.value)}
          className="w-full text-xs p-2 bg-secondary border border-border rounded-sm focus:outline-none focus:border-primary"
        >
          <option value="all">All Brands</option>
          {BRANDS.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      {/* Max Price Range */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <h4 className="font-semibold uppercase tracking-wider text-dark-muted">Max Price</h4>
          <span className="font-bold text-primary">₹{Number(filters.maxPrice || 10000).toLocaleString("en-IN")}</span>
        </div>
        <input
          type="range"
          min="500"
          max="10000"
          step="250"
          value={filters.maxPrice || 10000}
          onChange={(e) => onFilterChange("maxPrice", e.target.value)}
          className="w-full accent-primary cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-dark-muted">
          <span>₹500</span>
          <span>₹10,000+</span>
        </div>
      </div>
    </div>
  );
};
