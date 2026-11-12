import { INITIAL_EXCHANGES } from "../data/mockUsers";

const STORAGE_KEY_EXCHANGES = "stylecycle_exchanges";

export const exchangeService = {
  getExchanges() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_EXCHANGES);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.warn("Failed reading exchanges", e);
    }
    return INITIAL_EXCHANGES;
  },

  createExchangeRequest({ requestedItem, offeredItem, cashDifference = 0, message = "" }) {
    const list = this.getExchanges();
    const newRequest = {
      id: `EXC-${Math.floor(100 + Math.random() * 900)}`,
      type: "outgoing",
      status: "Pending",
      createdAt: new Date().toISOString().split("T")[0],
      requestedItem,
      offeredItem,
      targetSeller: requestedItem.seller || { name: "Seller", city: "India" },
      cashDifference: Number(cashDifference) || 0,
      message
    };
    list.unshift(newRequest);
    localStorage.setItem(STORAGE_KEY_EXCHANGES, JSON.stringify(list));
    return newRequest;
  },

  updateStatus(id, newStatus) {
    const list = this.getExchanges();
    const item = list.find(e => e.id === id);
    if (item) {
      item.status = newStatus;
      localStorage.setItem(STORAGE_KEY_EXCHANGES, JSON.stringify(list));
    }
    return list;
  }
};
