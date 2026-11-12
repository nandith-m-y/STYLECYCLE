import React from "react";
import { ArrowUpDown } from "lucide-react";

export const ProductSort = ({ currentSort, onSortChange, totalCount }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-3 border border-border rounded-sm shadow-subtle mb-6">
      <div className="text-xs text-dark-muted font-medium">
        Showing <span className="font-bold text-dark">{totalCount}</span> verified pieces
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <ArrowUpDown className="w-3.5 h-3.5 text-dark-muted flex-shrink-0" />
        <label htmlFor="sort-select" className="text-xs text-dark-muted font-medium flex-shrink-0">
          Sort by:
        </label>
        <select
          id="sort-select"
          value={currentSort || "popular"}
          onChange={(e) => onSortChange(e.target.value)}
          className="text-xs bg-secondary border border-border rounded-sm py-1.5 px-2.5 focus:outline-none focus:border-primary text-dark font-medium w-full sm:w-auto"
        >
          <option value="popular">Most Popular & Wishlisted</option>
          <option value="newest">Newest Arrivals</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};
