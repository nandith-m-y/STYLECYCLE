export const ADMIN_METRICS = {
  totalUsers: 14280,
  totalProducts: 3840,
  totalOrders: 9240,
  totalExchanges: 2190,
  marketplaceRevenue: "₹ 48,92,400",
  activeSellers: 840,
  circularEconomyCo2SavedKg: 18450
};

export const SALES_OVER_TIME = [
  { month: "May", sales: 280000, orders: 420 },
  { month: "Jun", sales: 340000, orders: 510 },
  { month: "Jul", sales: 410000, orders: 630 },
  { month: "Aug", sales: 520000, orders: 790 },
  { month: "Sep", sales: 680000, orders: 1040 },
  { month: "Oct", sales: 890000, orders: 1320 },
  { month: "Nov", sales: 1120000, orders: 1680 }
];

export const CATEGORY_DISTRIBUTION = [
  { name: "Tops & Shirts", value: 34, color: "#234B3B" },
  { name: "Jeans & Trousers", value: 26, color: "#BBA580" },
  { name: "Dresses & Ethnic", value: 18, color: "#4A5340" },
  { name: "Shoes & Footwear", value: 14, color: "#6E473B" },
  { name: "Accessories", value: 8, color: "#8A8D8F" }
];

export const MONTHLY_EXCHANGES = [
  { month: "Jun", requested: 140, completed: 95 },
  { month: "Jul", requested: 190, completed: 142 },
  { month: "Aug", requested: 260, completed: 198 },
  { month: "Sep", requested: 320, completed: 254 },
  { month: "Oct", border: 410, requested: 410, completed: 335 },
  { month: "Nov", requested: 480, completed: 395 }
];

export const RECENT_MODERATION_ITEMS = [
  {
    id: "MOD-101",
    title: "Vintage Burberry Nova Check Trench",
    seller: "Karan Johar",
    price: 18500,
    category: "Outerwear",
    date: "2026-11-10",
    status: "Approved",
    authenticityScore: "98% High Confidence"
  },
  {
    id: "MOD-102",
    title: "Gucci Monogram Marmont Belt",
    seller: "Sanya M.",
    price: 9900,
    category: "Accessories",
    date: "2026-11-11",
    status: "Under Review",
    authenticityScore: "84% Review Needed"
  },
  {
    id: "MOD-103",
    title: "Prada Nylon Re-Edition Shoulder Bag",
    seller: "Vikas Seth",
    price: 24000,
    category: "Bags",
    date: "2026-11-12",
    status: "Approved",
    authenticityScore: "99% Certified Receipt"
  }
];

export const ADMIN_USERS_LIST = [
  { id: "usr-1", name: "Tara Deshmukh", email: "tara.style@example.com", role: "Seller & Buyer", listings: 6, purchases: 12, rating: 4.95, status: "Active" },
  { id: "usr-2", name: "Elena Rostova", email: "elena.r@fashion.org", role: "Power Seller", listings: 38, purchases: 4, rating: 4.90, status: "Active" },
  { id: "usr-3", name: "Marcus Vance", email: "marcus.v@gmail.com", role: "Verified Seller", listings: 22, purchases: 18, rating: 4.70, status: "Active" },
  { id: "usr-4", name: "Aanya Sharma", email: "aanya.delhi@outlook.com", role: "Curator", listings: 45, purchases: 9, rating: 5.00, status: "Active" },
  { id: "usr-5", name: "Dev Patel", email: "dev.patel99@gmail.com", role: "Buyer", listings: 0, purchases: 5, rating: 4.60, status: "Active" }
];
