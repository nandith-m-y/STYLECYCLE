/**
 * STYLECYCLE - Common Display & Currency Formatters
 * Uses explicit Unicode escape \u20B9 for the Indian Rupee symbol to prevent
 * any UTF-8 / Windows-1252 encoding corruption (e.g. â‚¹ / â,¹ mojibake).
 */

export const RUPEE_SYMBOL = "\u20B9";

/**
 * Formats a numeric price into Indian Rupee format: e.g. ₹11,890
 * @param {number|string} amount
 * @returns {string}
 */
export function formatPrice(amount) {
  const num = Number(amount);
  if (isNaN(num)) return `${RUPEE_SYMBOL}0`;
  return `${RUPEE_SYMBOL}${num.toLocaleString("en-IN")}`;
}

/**
 * Formats a numeric discount percentage: e.g. 62%
 * @param {number|string} discount
 * @returns {string}
 */
export function formatDiscount(discount) {
  const num = Number(discount);
  if (isNaN(num) || num <= 0) return "";
  return `${Math.round(num)}%`;
}

