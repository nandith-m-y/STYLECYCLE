import { INITIAL_ORDERS } from "../data/mockUsers.js";

/**
 * SECURITY ARCHITECTURE NOTICE:
 * This module provides demonstration order handling for local UI prototyping.
 *
 * CRITICAL LIMITATION:
 * Client-side order validation cannot replace backend authoritative transaction integrity.
 * In Phase 2, the FastAPI backend will:
 * 1. Query PostgreSQL for canonical unit prices.
 * 2. Calculate tax, discounts, and insured shipping server-side.
 * 3. Enforce cryptographic idempotency keys via Redis.
 * 4. Verify payment gateway webhooks using HMAC-SHA256 signatures before confirming orders.
 */

const STORAGE_KEY_ORDERS = "stylecycle_orders";
const RECENT_IDEMPOTENCY_KEYS = new Map();

export const orderService = {
  getOrders(userId = null) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_ORDERS);
      const orders = raw ? JSON.parse(raw) : INITIAL_ORDERS;
      if (userId) {
        return orders.filter(o => o.buyerId === userId || !o.buyerId);
      }
      return orders;
    } catch (e) {
      console.warn("[STYLECYCLE DEMO ORDERS] Failed reading orders", e);
    }
    return INITIAL_ORDERS;
  },

  createOrder({ items, totalAmount, shippingAddress, paymentMethod, idempotencyKey = null, buyerId = null }) {
    // 1. Data Validation: Validate cart items
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error("Cannot place an empty order. Cart must contain at least one valid item.");
    }

    // 2. Reject negative, zero, or NaN prices & invalid quantities (SEC-VULN-003)
    for (const item of items) {
      const price = Number(item.price);
      const qty = Number(item.quantity);
      if (isNaN(price) || price <= 0) {
        throw new Error(`Invalid item price detected for '${item.name || item.id}'. Non-positive prices are rejected.`);
      }
      if (isNaN(qty) || qty <= 0 || qty > 10) {
        throw new Error(`Invalid quantity detected for '${item.name || item.id}'. Must be between 1 and 10.`);
      }
    }

    // 3. Client-side re-computation defense check
    const calculatedSubtotal = items.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0);
    const calculatedShipping = calculatedSubtotal >= 2999 ? 0 : 149;
    const expectedTotal = calculatedSubtotal + calculatedShipping;

    if (Math.abs(expectedTotal - Number(totalAmount)) > 1) {
      throw new Error("Order calculation mismatch. The order total must equal subtotal plus shipping fee.");
    }

    // 4. Duplicate Submission & Idempotency Protection (SEC-VULN-010)
    if (idempotencyKey) {
      if (RECENT_IDEMPOTENCY_KEYS.has(idempotencyKey)) {
        console.warn("[STYLECYCLE DEMO ORDERS] Duplicate order submission detected. Returning existing order.");
        return RECENT_IDEMPOTENCY_KEYS.get(idempotencyKey);
      }
    }

    const orders = this.getOrders();
    const newOrder = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      buyerId: buyerId || "usr-demo-01",
      date: new Date().toISOString().split("T")[0],
      status: "Demo_Processing",
      paymentMethod: paymentMethod || "UPI",
      paymentStatus: "MOCK_SIMULATED_DEMO", // Explicitly labeled as mock demonstration
      isMockPayment: true,
      verificationDisclaimer: "DEMONSTRATION ONLY: Payment has NOT been verified by an actual banking gateway. Simulated for UI testing only.",
      totalAmount: expectedTotal,
      subtotal: calculatedSubtotal,
      shippingFee: calculatedShipping,
      trackingNumber: `SC-EXP-${Math.floor(1000000 + Math.random() * 9000000)}`,
      shippingAddress: {
        name: shippingAddress?.name?.trim() || "Customer",
        street: shippingAddress?.street?.trim() || "",
        city: shippingAddress?.city?.trim() || "",
        pincode: shippingAddress?.pincode?.trim() || "",
        phone: shippingAddress?.phone?.trim() || ""
      },
      items: items.map(i => ({
        id: i.id,
        name: i.name,
        brand: i.brand,
        size: i.selectedSize || i.size || "M",
        price: Number(i.price),
        quantity: Number(i.quantity) || 1,
        image: i.images ? i.images[0] : (i.image || "")
      }))
    };

    orders.unshift(newOrder);

    try {
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.warn("[STYLECYCLE DEMO ORDERS] Could not persist to localStorage:", e);
    }

    if (idempotencyKey) {
      RECENT_IDEMPOTENCY_KEYS.set(idempotencyKey, newOrder);
      setTimeout(() => RECENT_IDEMPOTENCY_KEYS.delete(idempotencyKey), 300000); // 5 min cache
    }

    return newOrder;
  }
};
