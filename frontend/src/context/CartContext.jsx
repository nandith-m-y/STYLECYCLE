import React, { createContext, useContext, useState, useEffect } from "react";

/**
 * IMPORTANT SECURITY NOTICE:
 * Client-side cart validation provides UI input sanitization and defense-in-depth against
 * accidental errors or malformed payloads.
 *
 * CRITICAL LIMITATION:
 * Client-side validation CANNOT prevent deliberate price manipulation by a motivated attacker
 * modifying browser memory or intercepted HTTP requests. True financial transaction security
 * requires server-authoritative price lookup and re-computation against the PostgreSQL database
 * during Phase 2 backend integration.
 */

const CartContext = createContext();
const STORAGE_KEY = "stylecycle_cart";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      // Validate and sanitize stored items on load (reject negative or zero prices)
      if (Array.isArray(parsed)) {
        return parsed.filter(item => 
          item && 
          typeof item.id === "string" &&
          typeof item.price === "number" && 
          item.price > 0 &&
          typeof item.quantity === "number" && 
          item.quantity > 0 &&
          item.quantity <= 10
        );
      }
      return [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, selectedSize = "M", quantity = 1) => {
    if (!product || typeof product !== "object") return;

    // Reject non-positive or non-numeric prices (SEC-VULN-003)
    const validPrice = Number(product.price);
    if (isNaN(validPrice) || validPrice <= 0) {
      console.warn("[STYLECYCLE CART] Rejected item with zero or negative price:", product.name);
      return;
    }

    // Sanitize quantity (must be integer between 1 and 10)
    const validQuantity = Math.max(1, Math.min(10, Math.floor(Number(quantity)) || 1));
    const safeSize = typeof selectedSize === "string" ? selectedSize.trim() : (product.size || "M");

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === product.id && item.selectedSize === safeSize
      );

      if (existingIndex > -1) {
        const next = [...prev];
        const newQty = Math.min(10, next[existingIndex].quantity + validQuantity);
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: newQty
        };
        return next;
      } else {
        return [
          ...prev,
          {
            ...product,
            price: validPrice,
            selectedSize: safeSize,
            quantity: validQuantity
          }
        ];
      }
    });
  };

  const removeFromCart = (productId, selectedSize) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.id === productId && item.selectedSize === selectedSize)
      )
    );
  };

  const updateQuantity = (productId, selectedSize, newQty) => {
    const parsedQty = Math.floor(Number(newQty));

    // Reject negative quantities or remove if 0
    if (isNaN(parsedQty) || parsedQty <= 0) {
      removeFromCart(productId, selectedSize);
      return;
    }

    // Cap maximum single line-item quantity to 10
    const sanitizedQty = Math.min(10, parsedQty);

    setCart((prev) =>
      prev.map((item) => {
        if (item.id === productId && item.selectedSize === selectedSize) {
          return { ...item, quantity: sanitizedQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => setCart([]);

  // Compute subtotals strictly over sanitized items
  const validItems = cart.filter(item => 
    typeof item.price === "number" && item.price > 0 && 
    typeof item.quantity === "number" && item.quantity > 0
  );

  const subtotal = validItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = subtotal >= 2999 || subtotal === 0 ? 0 : 149;
  const total = subtotal + shippingFee;
  const cartCount = validItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart: validItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        shippingFee,
        total,
        cartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
