import apiClient from "./api";
import { INITIAL_PRODUCTS } from "../data/products";
import { safeStorageSetItem } from "../utils/imageSecurity";

const STORAGE_KEY_PRODUCTS = "stylecycle_products";

const getStoredProducts = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PRODUCTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn("Error reading stored products", e);
  }
  return INITIAL_PRODUCTS;
};

const saveStoredProducts = (products) => {
  const result = safeStorageSetItem(STORAGE_KEY_PRODUCTS, products);
  if (!result.success) {
    throw new Error(result.error);
  }
};

export const productService = {
  async getProducts(filters = {}) {
    let items = getStoredProducts();

    if (filters.search) {
      const q = filters.search.toLowerCase();
      items = items.filter(
        p => p.name.toLowerCase().includes(q) ||
             p.brand.toLowerCase().includes(q) ||
             p.categoryName.toLowerCase().includes(q) ||
             p.description.toLowerCase().includes(q)
      );
    }

    if (filters.category && filters.category !== "all") {
      items = items.filter(p => p.category === filters.category);
    }

    if (filters.gender && filters.gender !== "all") {
      items = items.filter(p => p.gender === filters.gender || p.gender === "unisex");
    }

    if (filters.brand && filters.brand !== "all") {
      items = items.filter(p => p.brand === filters.brand);
    }

    if (filters.condition && filters.condition !== "all") {
      items = items.filter(p => p.condition === filters.condition);
    }

    if (filters.size && filters.size !== "all") {
      items = items.filter(p => p.size === filters.size);
    }

    if (filters.exchangeOnly) {
      items = items.filter(p => p.isExchangeable);
    }

    if (filters.maxPrice) {
      items = items.filter(p => p.price <= Number(filters.maxPrice));
    }

    if (filters.sort) {
      if (filters.sort === "price-low") items.sort((a, b) => a.price - b.price);
      else if (filters.sort === "price-high") items.sort((a, b) => b.price - a.price);
      else if (filters.sort === "newest") items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      else if (filters.sort === "popular") items.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return items;
  },

  async getProductById(id) {
    const items = getStoredProducts();
    const product = items.find(p => p.id === id);
    if (!product) throw new Error("Product not found");
    return product;
  },

  async createProduct(listingData) {
    const items = getStoredProducts();
    const newProduct = {
      ...listingData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
      rating: 5.0,
      reviewsCount: 0,
      seller: {
        id: "usr-current",
        name: "Tara Deshmukh",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        rating: 5.0,
        salesCount: 1,
        verified: true,
        city: "Mumbai"
      }
    };
    items.unshift(newProduct);
    saveStoredProducts(items);
    return newProduct;
  },

  async updateProduct(id, updatedData) {
    const items = getStoredProducts();
    const index = items.findIndex(p => p.id === id);
    if (index === -1) throw new Error("Product not found");
    items[index] = { ...items[index], ...updatedData };
    saveStoredProducts(items);
    return items[index];
  },

  async deleteProduct(id) {
    const items = getStoredProducts();
    const filtered = items.filter(p => p.id !== id);
    saveStoredProducts(filtered);
    return true;
  }
};
