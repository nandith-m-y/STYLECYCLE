export const CURRENT_USER = {
  id: "usr-demo-01",
  name: "Tara Deshmukh",
  email: "tara.style@example.com",
  phone: "+91 98200 45678",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  bio: "Curator of slow vintage finds and minimal Scandinavian staples. Promoting circular fashion in Mumbai.",
  memberSince: "March 2025",
  rating: 4.95,
  role: "user", // "user" or "admin"
  measurements: {
    height: 168,
    chest: 90,
    waist: 72,
    hip: 95,
    shoulder: 41,
    sleeve: 60,
    inseam: 79,
    preferredFit: "Regular"
  },
  addresses: [
    {
      id: "addr-1",
      title: "Home",
      name: "Tara Deshmukh",
      street: "Flat 402, Sea Green Apartments, Worli Sea Face",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400030",
      phone: "+91 98200 45678",
      isDefault: true
    },
    {
      id: "addr-2",
      title: "Studio",
      name: "Tara Deshmukh",
      street: "Studio 12, Laxmi Industrial Estate, Andheri West",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400053",
      phone: "+91 98200 45678",
      isDefault: false
    }
  ]
};

// Explicit mock demonstration administrator account for local UI testing only.
// This is not a production authorization mechanism.
export const DEMO_ADMIN_USER = {
  id: "usr-demo-admin",
  name: "STYLECYCLE Admin (Demo)",
  email: "admin@stylecycle.demo",
  phone: "+91 90000 00000",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  bio: "System Administrator identity for local Phase 1 UI demonstration testing only.",
  memberSince: "November 2026",
  rating: 5.0,
  role: "admin",
  isMockDemoAdmin: true,
  measurements: {
    height: 175,
    chest: 96,
    waist: 82,
    hip: 100,
    shoulder: 45,
    sleeve: 64,
    inseam: 82,
    preferredFit: "Regular"
  },
  addresses: []
};

export const INITIAL_ORDERS = [
  {
    id: "ORD-94821",
    date: "2026-10-29",
    status: "Delivered",
    paymentMethod: "UPI",
    totalAmount: 3649,
    trackingNumber: "SC-EXP-7729104",
    shippingAddress: {
      name: "Tara Deshmukh",
      street: "Flat 402, Sea Green Apartments, Worli Sea Face",
      city: "Mumbai",
      pincode: "400030"
    },
    items: [
      {
        id: "prod-1",
        name: "Structured Oversized Linen Blazer",
        brand: "Massimo Dutti",
        size: "M",
        price: 3490,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=400&q=80",
        quantity: 1
      }
    ]
  },
  {
    id: "ORD-89214",
    date: "2026-10-10",
    status: "Delivered",
    paymentMethod: "Credit Card",
    totalAmount: 1890,
    trackingNumber: "SC-BLR-449102",
    shippingAddress: {
      name: "Tara Deshmukh",
      street: "Flat 402, Sea Green Apartments, Worli Sea Face",
      city: "Mumbai",
      pincode: "400030"
    },
    items: [
      {
        id: "prod-2",
        name: "Classic 501 Original Straight Leg Jeans",
        brand: "Levi's",
        size: "L",
        price: 1890,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=400&q=80",
        quantity: 1
      }
    ]
  }
];

export const INITIAL_EXCHANGES = [
  {
    id: "EXC-101",
    type: "incoming",
    status: "Pending", // Pending, Accepted, Rejected, Completed
    createdAt: "2026-11-04",
    requestedItem: {
      id: "prod-1",
      name: "Structured Oversized Linen Blazer",
      brand: "Massimo Dutti",
      size: "M",
      price: 3490,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=400&q=80"
    },
    offeredItem: {
      id: "w-offered-1",
      name: "Handwoven Mulberry Silk Trench",
      brand: "Raw Mango",
      size: "M",
      condition: "Like New",
      estimatedValue: 4500,
      image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=400&q=80"
    },
    requester: {
      name: "Pooja Hegde",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
      rating: 4.9,
      city: "Delhi"
    },
    cashDifference: 0,
    message: "Hi Tara! I've been searching everywhere for this Massimo blazer. My Raw Mango trench is barely worn and comes with the garment bag. Would love to swap!"
  },
  {
    id: "EXC-102",
    type: "outgoing",
    status: "Accepted",
    createdAt: "2026-10-30",
    requestedItem: {
      id: "prod-7",
      name: "Relaxed Pleated Wide-Leg Trousers",
      brand: "Mango",
      size: "S",
      price: 2100,
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=400&q=80"
    },
    offeredItem: {
      id: "w-offered-2",
      name: "Crisp Oxford Cotton Button-Down",
      brand: "Ralph Lauren",
      size: "M",
      condition: "Good",
      estimatedValue: 2200,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&q=80"
    },
    targetSeller: {
      name: "Aanya Sharma",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
      city: "New Delhi"
    },
    cashDifference: 0,
    message: "Hello Aanya, offering my authentic Ralph Lauren oxford shirt in swap for your pleated trousers. Perfectly matches your minimalist wishlist."
  }
];
