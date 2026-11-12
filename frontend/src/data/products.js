export const INITIAL_PRODUCTS = [
  {
    id: "prod-1",
    name: "Structured Oversized Linen Blazer",
    brand: "Massimo Dutti",
    category: "tops-shirts",
    categoryName: "Blazers & Tops",
    gender: "women",
    size: "M",
    condition: "Like New",
    conditionNote: "Worn once to a gallery opening. Pristine lapels and buttons.",
    price: 3490,
    originalPrice: 8990,
    discount: 61,
    color: "Beige / Cream",
    material: "100% European Flax Linen",
    isExchangeable: true,
    exchangeWishlist: "Looking for COS tailored wool trousers (Size S) or structured trench coat.",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80"
    ],
    seller: {
      id: "seller-1",
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      rating: 4.9,
      salesCount: 38,
      verified: true,
      city: "Bangalore"
    },
    description: "An effortless essential crafted from breathable linen. Features padded shoulders, notched lapels, horn-effect buttons, and twin flap pockets. Perfect for spring-summer smart casual or layering over silk slips.",
    specifications: {
      "Fit": "Relaxed Tailored",
      "Care": "Dry Clean Recommended",
      "Origin": "Portugal",
      "Pockets": "2 External, 1 Interior"
    },
    rating: 4.8,
    reviewsCount: 14,
    measurements: { chest: 98, shoulder: 44, sleeve: 63, length: 74 },
    createdAt: "2026-10-15"
  },
  {
    id: "prod-2",
    name: "Classic 501 Original Straight Leg Jeans",
    brand: "Levi's",
    category: "jeans-trousers",
    categoryName: "Jeans & Trousers",
    gender: "men",
    size: "L",
    condition: "Good",
    conditionNote: "Beautiful authentic vintage wash fade with clean hems.",
    price: 1890,
    originalPrice: 4999,
    discount: 62,
    color: "Navy Blue",
    material: "100% Non-Stretch Cotton Denim",
    isExchangeable: true,
    exchangeWishlist: "Open to swap for raw selvedge denim in Size 32 / M.",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80"
    ],
    seller: {
      id: "seller-2",
      name: "Marcus Vance",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      rating: 4.7,
      salesCount: 22,
      verified: true,
      city: "Mumbai"
    },
    description: "The blueprint for every pair of modern jeans. Sits at the waist with a straight leg and iconic copper shank button fly. Naturally softened through gentle wear.",
    specifications: {
      "Rise": "Mid-High Rise (11.5 in)",
      "Fly": "Original Button Fly",
      "Weight": "14 oz Heavyweight Denim"
    },
    rating: 4.9,
    reviewsCount: 29,
    measurements: { waist: 88, hip: 106, inseam: 82 },
    createdAt: "2026-10-20"
  },
  {
    id: "prod-3",
    name: "Pleated Minimalist Poplin Midi Dress",
    brand: "COS",
    category: "dresses-ethnic",
    categoryName: "Dresses & Gowns",
    gender: "women",
    size: "S",
    condition: "Brand New",
    conditionNote: "Unworn with tags. Bought wrong size from European boutique.",
    price: 4200,
    originalPrice: 9500,
    discount: 56,
    color: "Black",
    material: "100% Organic Crisp Cotton Poplin",
    isExchangeable: false,
    exchangeWishlist: null,
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80"
    ],
    seller: {
      id: "seller-3",
      name: "Aanya Sharma",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
      rating: 5.0,
      salesCount: 45,
      verified: true,
      city: "New Delhi"
    },
    description: "Architectural silhouette with subtle waist pleats, side seam pockets, and concealed rear zip. Balances scandi minimalism with everyday elegance.",
    specifications: {
      "Length": "Midi (118 cm)",
      "Neckline": "High Jewel Neck",
      "Sleeve": "Sleeveless"
    },
    rating: 5.0,
    reviewsCount: 8,
    measurements: { chest: 92, waist: 76, hip: 96, length: 118 },
    createdAt: "2026-10-28"
  },
  {
    id: "prod-4",
    name: "Heavyweight Boxy Crewneck T-Shirt",
    brand: "Arket",
    category: "tops-shirts",
    categoryName: "T-Shirts",
    gender: "unisex",
    size: "M",
    condition: "Like New",
    conditionNote: "Washed cold once, air-dried. Flawless structure.",
    price: 990,
    originalPrice: 2490,
    discount: 60,
    color: "White",
    material: "220 GSM Combed Organic Cotton",
    isExchangeable: true,
    exchangeWishlist: "Will exchange for dark green or charcoal tee in size M.",
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80"
    ],
    seller: {
      id: "seller-4",
      name: "Rohan Nair",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      rating: 4.8,
      salesCount: 19,
      verified: true,
      city: "Pune"
    },
    description: "The quintessential everyday tee. Substantial 220 GSM single jersey knitted from long-staple organic cotton. Reinforced rib collar that holds shape forever.",
    specifications: {
      "Collar": "Tight 2.5cm ribbed neckband",
      "Cut": "Boxy, dropped shoulders"
    },
    rating: 4.7,
    reviewsCount: 16,
    measurements: { chest: 98, shoulder: 46, sleeve: 23, length: 72 },
    createdAt: "2026-11-01"
  },
  {
    id: "prod-5",
    name: "Air Force 1 '07 Low Retro Sneakers",
    brand: "Nike",
    category: "shoes",
    categoryName: "Sneakers & Shoes",
    gender: "unisex",
    size: "L",
    condition: "Good",
    conditionNote: "Minor toe box creasing, tread is 90% intact. Clean white leather.",
    price: 3600,
    originalPrice: 8495,
    discount: 57,
    color: "White",
    material: "Full Grain Leather & Nike Air Cushioning",
    isExchangeable: true,
    exchangeWishlist: "Interested in New Balance 550 or Chelsea boots (UK 9 / 10).",
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80"
    ],
    seller: {
      id: "seller-2",
      name: "Marcus Vance",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      rating: 4.7,
      salesCount: 22,
      verified: true,
      city: "Mumbai"
    },
    description: "The streetwear legend. Stitched leather overlays, iconic perforated toe box, and encapsulated Air-sole cushioning for durable comfort.",
    specifications: {
      "UK/India Size": "9.5",
      "Outsole": "Non-marking pivot circle rubber"
    },
    rating: 4.9,
    reviewsCount: 34,
    measurements: { length: 28.5 },
    createdAt: "2026-10-18"
  },
  {
    id: "prod-6",
    name: "Pure Merino Wool Knit Turtleneck",
    brand: "Zara",
    category: "tops-shirts",
    categoryName: "Sweaters & Knitwear",
    gender: "men",
    size: "M",
    condition: "Like New",
    conditionNote: "Immaculate condition. Stored with cedar blocks, zero pilling.",
    price: 1750,
    originalPrice: 4290,
    discount: 59,
    color: "Olive Green",
    material: "100% Extra-fine Merino Wool",
    isExchangeable: true,
    exchangeWishlist: "Exchange for crewneck cable knit or corduroy overshirt (Size M).",
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80"
    ],
    seller: {
      id: "seller-1",
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      rating: 4.9,
      salesCount: 38,
      verified: true,
      city: "Bangalore"
    },
    description: "Finely spun 19.5-micron merino wool delivering lightweight thermal warmth without bulk. Fold-over rollneck collar and ribbed cuffs.",
    specifications: {
      "Gauge": "14-gauge fine knit",
      "Breathability": "Naturally thermo-regulating"
    },
    rating: 4.6,
    reviewsCount: 11,
    measurements: { chest: 97, shoulder: 44, sleeve: 64, length: 69 },
    createdAt: "2026-10-25"
  },
  {
    id: "prod-7",
    name: "Relaxed Pleated Wide-Leg Trousers",
    brand: "Mango",
    category: "jeans-trousers",
    categoryName: "Trousers",
    gender: "women",
    size: "S",
    condition: "Brand New",
    conditionNote: "Brand new with tags, unworn.",
    price: 2100,
    originalPrice: 4990,
    discount: 58,
    color: "Terracotta",
    material: "Tencel Lyocell & Viscose Blend",
    isExchangeable: true,
    exchangeWishlist: "Looking for tailored beige trousers in S/M or silk scarf.",
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80"
    ],
    seller: {
      id: "seller-3",
      name: "Aanya Sharma",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
      rating: 5.0,
      salesCount: 45,
      verified: true,
      city: "New Delhi"
    },
    description: "High-waisted trousers with deep double front pleats and flowing wide legs. Drapes elegantly for both daytime gallery walks and dinner engagements.",
    specifications: {
      "Closure": "Hook-and-bar with zip fly",
      "Pockets": "Side slant pockets"
    },
    rating: 4.8,
    reviewsCount: 19,
    measurements: { waist: 74, hip: 98, inseam: 80 },
    createdAt: "2026-11-03"
  },
  {
    id: "prod-8",
    name: "Full Grain Leather Minimalist Crossbody Bag",
    brand: "Massimo Dutti",
    category: "accessories",
    categoryName: "Bags & Leather",
    gender: "unisex",
    size: "M",
    condition: "Like New",
    conditionNote: "Gentle patina on strap, interior lining is spotless.",
    price: 3200,
    originalPrice: 7990,
    discount: 60,
    color: "Brown",
    material: "100% Vegetable-Tanned Cowhide Leather",
    isExchangeable: false,
    exchangeWishlist: null,
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80"
    ],
    seller: {
      id: "seller-1",
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      rating: 4.9,
      salesCount: 38,
      verified: true,
      city: "Bangalore"
    },
    description: "Sculptural saddlery leather crossbody bag featuring aged gold brass hardware, adjustable shoulder strap, and magnetic flap closure. Fits iPad Mini, daily essentials and journal.",
    specifications: {
      "Dimensions": "24 x 18 x 7 cm",
      "Hardware": "Brushed antique brass"
    },
    rating: 5.0,
    reviewsCount: 22,
    measurements: {},
    createdAt: "2026-10-12"
  }
];
