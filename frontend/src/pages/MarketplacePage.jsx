import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { productService } from "../services/productService";
import { ProductCard } from "../components/common/ProductCard";
import { ProductFilters } from "../components/marketplace/ProductFilters";
import { ProductSort } from "../components/marketplace/ProductSort";
import { EmptyState } from "../components/common/EmptyState";
import { Filter, Search, X, Sparkles } from "lucide-react";

export const MarketplacePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter state
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "all",
    gender: searchParams.get("gender") || "all",
    brand: searchParams.get("brand") || "all",
    condition: searchParams.get("condition") || "all",
    size: searchParams.get("size") || "all",
    maxPrice: searchParams.get("maxPrice") || 10000,
    exchangeOnly: searchParams.get("exchangeOnly") === "true",
    sort: searchParams.get("sort") || "popular"
  });

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync with searchParams
  useEffect(() => {
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "all";
    const gender = searchParams.get("gender") || "all";
    setFilters(prev => ({
      ...prev,
      search,
      category,
      gender
    }));
  }, [searchParams]);

  // Fetch filtered products
  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        const data = await productService.getProducts(filters);
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: "",
      category: "all",
      gender: "all",
      brand: "all",
      condition: "all",
      size: "all",
      maxPrice: 10000,
      exchangeOnly: false,
      sort: "popular"
    });
    setSearchParams({});
  };

  // Active filter chips
  const activeChips = [];
  if (filters.search) activeChips.push({ key: "search", label: `Search: "${filters.search}"`, resetVal: "" });
  if (filters.category !== "all") activeChips.push({ key: "category", label: `Category: ${filters.category}`, resetVal: "all" });
  if (filters.gender !== "all") activeChips.push({ key: "gender", label: `Gender: ${filters.gender}`, resetVal: "all" });
  if (filters.brand !== "all") activeChips.push({ key: "brand", label: `Brand: ${filters.brand}`, resetVal: "all" });
  if (filters.condition !== "all") activeChips.push({ key: "condition", label: `Condition: ${filters.condition}`, resetVal: "all" });
  if (filters.size !== "all") activeChips.push({ key: "size", label: `Size: ${filters.size}`, resetVal: "all" });
  if (filters.exchangeOnly) activeChips.push({ key: "exchangeOnly", label: "Exchangeable Only", resetVal: false });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      
      {/* Page Title & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Circular Catalog</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-dark mt-1">The Marketplace</h1>
          <p className="text-xs text-dark-muted mt-1">
            Browse verified garments ready for immediate purchase or circular exchange.
          </p>
        </div>

        {/* Global Search Input */}
        <div className="w-full md:w-80 relative">
          <input
            type="text"
            placeholder="Search products, brands, or styles..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-border rounded-sm focus:outline-none focus:border-primary shadow-subtle"
          />
          <Search className="w-4 h-4 text-dark-muted absolute left-3 top-2.5" />
          {filters.search && (
            <button
              onClick={() => handleFilterChange("search", "")}
              className="absolute right-2.5 top-2.5 text-dark-muted hover:text-dark"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="lg:hidden flex items-center justify-between">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-border text-xs font-bold text-dark rounded-sm shadow-subtle"
        >
          <Filter className="w-4 h-4 text-primary" />
          Filters ({activeChips.length})
        </button>
        <span className="text-xs text-dark-muted font-medium">{products.length} Items</span>
      </div>

      {/* Active Filter Chips */}
      {activeChips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-dark-muted font-medium mr-1">Active filters:</span>
          {activeChips.map((chip) => (
            <span
              key={chip.key}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-border text-xs text-dark font-medium shadow-2xs"
            >
              {chip.label}
              <button
                onClick={() => handleFilterChange(chip.key, chip.resetVal)}
                className="text-dark-muted hover:text-rose-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <button
            onClick={handleResetFilters}
            className="text-xs text-primary font-bold hover:underline ml-2"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Grid: Sidebar Filters + Products */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block lg:col-span-1 sticky top-28">
          <ProductFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            isMobile={false}
          />
        </aside>

        {/* Mobile Filter Drawer */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-xs"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <div className="relative ml-auto w-full max-w-xs bg-white h-full overflow-y-auto p-4 z-10">
              <ProductFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
                isMobile={true}
                onCloseMobile={() => setMobileFiltersOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Products Content Area */}
        <div className="lg:col-span-3">
          <ProductSort
            currentSort={filters.sort}
            onSortChange={(val) => handleFilterChange("sort", val)}
            totalCount={products.length}
          />

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="bg-white border border-border rounded-sm p-4 h-80 animate-pulse flex flex-col justify-between">
                  <div className="bg-secondary h-48 rounded" />
                  <div className="space-y-2 pt-3">
                    <div className="bg-secondary h-4 w-3/4 rounded" />
                    <div className="bg-secondary h-3 w-1/2 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Search}
              title="No garments match your filters"
              description="Try broadening your filters, resetting price boundaries, or checking for other brands."
              actionText="Reset All Filters"
              onAction={handleResetFilters}
            />
          )}
        </div>

      </div>

    </div>
  );
};
