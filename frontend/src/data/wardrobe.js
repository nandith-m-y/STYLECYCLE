export const INITIAL_WARDROBE = [
  {
    id: "w-1",
    name: "Crisp Oxford Cotton Button-Down",
    category: "Shirts",
    type: "top",
    color: "White",
    brand: "Ralph Lauren",
    size: "M",
    season: "All Season",
    style: "Smart Casual",
    occasion: "Office",
    isFavorite: true,
    wearCount: 18,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
    tags: ["formal", "office", "minimal", "essential"],
    addedDate: "2026-09-10"
  },
  {
    id: "w-2",
    name: "Washed Raw Edge Denim Jacket",
    category: "Jackets",
    type: "outerwear",
    color: "Navy Blue",
    brand: "Levi's",
    size: "M",
    season: "Autumn",
    style: "Streetwear",
    occasion: "Casual",
    isFavorite: true,
    wearCount: 27,
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80",
    tags: ["vintage", "denim", "layering"],
    addedDate: "2026-08-22"
  },
  {
    id: "w-3",
    name: "Slim Tapered Chino Trousers",
    category: "Trousers",
    type: "bottom",
    color: "Beige / Cream",
    brand: "Zara",
    size: "M",
    season: "Spring",
    style: "Smart Casual",
    occasion: "Office",
    isFavorite: false,
    wearCount: 12,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80",
    tags: ["neutral", "office", "tailored"],
    addedDate: "2026-09-02"
  },
  {
    id: "w-4",
    name: "Vintage Graphic Boxy Tee",
    category: "T-shirts",
    type: "top",
    color: "Black",
    brand: "Urbanic",
    size: "L",
    season: "Summer",
    style: "Streetwear",
    occasion: "College",
    isFavorite: true,
    wearCount: 31,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
    tags: ["streetwear", "weekend", "casual"],
    addedDate: "2026-07-15"
  },
  {
    id: "w-5",
    name: "Relaxed Fit Selvedge Denim",
    category: "Jeans",
    type: "bottom",
    color: "Navy Blue",
    brand: "Uniqlo",
    size: "M",
    season: "All Season",
    style: "Casual",
    occasion: "Casual",
    isFavorite: true,
    wearCount: 42,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
    tags: ["denim", "versatile", "staple"],
    addedDate: "2026-06-18"
  },
  {
    id: "w-6",
    name: "Minimalist Low-Top Leather Sneakers",
    category: "Shoes",
    type: "shoes",
    color: "White",
    brand: "COS",
    size: "L",
    season: "All Season",
    style: "Minimalist",
    occasion: "Casual",
    isFavorite: false,
    wearCount: 25,
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80",
    tags: ["clean", "white sneakers", "everyday"],
    addedDate: "2026-08-05"
  },
  {
    id: "w-7",
    name: "Brushed Wool Overcoat",
    category: "Jackets",
    type: "outerwear",
    color: "Brown",
    brand: "Massimo Dutti",
    size: "M",
    season: "Winter",
    style: "Formal",
    occasion: "Party",
    isFavorite: true,
    wearCount: 8,
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
    tags: ["tailored", "winter", "luxury"],
    addedDate: "2026-10-01"
  },
  {
    id: "w-8",
    name: "Canvas Minimalist Tote Bag",
    category: "Accessories",
    type: "accessories",
    color: "Beige / Cream",
    brand: "Arket",
    size: "M",
    season: "All Season",
    style: "Minimalist",
    occasion: "College",
    isFavorite: false,
    wearCount: 39,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    tags: ["tote", "practical", "daily"],
    addedDate: "2026-05-12"
  }
];

export const INITIAL_SAVED_OUTFITS = [
  {
    id: "outfit-1",
    name: "Curated Autumn Gallery Walk",
    occasion: "Casual",
    style: "Minimalist",
    top: INITIAL_WARDROBE[0], // Oxford Shirt
    bottom: INITIAL_WARDROBE[4], // Selvedge Jeans
    shoes: INITIAL_WARDROBE[5], // Low-Top Sneakers
    accessory: INITIAL_WARDROBE[7], // Tote Bag
    outerwear: INITIAL_WARDROBE[1], // Denim Jacket
    explanation: "Harmonizes relaxed architectural proportions with timeless neutral hues for a sophisticated daytime look.",
    savedAt: "2026-10-24"
  }
];
