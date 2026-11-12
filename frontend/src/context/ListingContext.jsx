import React, { createContext, useContext, useState, useEffect } from "react";
import { INITIAL_PRODUCTS } from "../data/products";

const ListingContext = createContext();
const STORAGE_KEY = "stylecycle_user_listings";

const DEFAULT_USER_LISTINGS = [
  {
    ...INITIAL_PRODUCTS[0],
    id: "user-list-1",
    status: "Active", // Active, Draft, Sold
    viewsCount: 142,
    likesCount: 18
  },
  {
    id: "user-list-2",
    name: "Handmade Chunky Wool Cardigan",
    brand: "Zara",
    category: "tops-shirts",
    categoryName: "Sweaters",
    gender: "women",
    size: "S",
    condition: "Good",
    price: 1800,
    originalPrice: 4500,
    discount: 60,
    status: "Sold",
    soldDate: "2026-10-18",
    images: ["https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80"],
    viewsCount: 310,
    likesCount: 42
  },
  {
    id: "user-list-3",
    name: "Pleated Tapered Linen Trousers",
    brand: "Uniqlo",
    category: "jeans-trousers",
    categoryName: "Trousers",
    gender: "women",
    size: "M",
    condition: "Brand New",
    price: 1990,
    originalPrice: 3490,
    discount: 43,
    status: "Draft",
    images: ["https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80"],
    viewsCount: 0,
    likesCount: 0
  }
];

export const ListingProvider = ({ children }) => {
  const [listings, setListings] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_USER_LISTINGS;
    } catch {
      return DEFAULT_USER_LISTINGS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
  }, [listings]);

  const addListing = (listingData, status = "Active") => {
    const newListing = {
      ...listingData,
      id: `list-${Date.now()}`,
      status,
      viewsCount: 1,
      likesCount: 0,
      createdAt: new Date().toISOString().split("T")[0]
    };
    setListings(prev => [newListing, ...prev]);
    return newListing;
  };

  const updateListing = (id, updatedData) => {
    setListings(prev => prev.map(item => item.id === id ? { ...item, ...updatedData } : item));
  };

  const deleteListing = (id) => {
    setListings(prev => prev.filter(item => item.id !== id));
  };

  const activeListings = listings.filter(l => l.status === "Active");
  const draftListings = listings.filter(l => l.status === "Draft");
  const soldListings = listings.filter(l => l.status === "Sold");

  return (
    <ListingContext.Provider
      value={{
        listings,
        activeListings,
        draftListings,
        soldListings,
        addListing,
        updateListing,
        deleteListing
      }}
    >
      {children}
    </ListingContext.Provider>
  );
};

export const useListings = () => useContext(ListingContext);
