import { INITIAL_WARDROBE, INITIAL_SAVED_OUTFITS } from "../data/wardrobe";
import { safeStorageSetItem } from "../utils/imageSecurity";

const STORAGE_KEY_WARDROBE = "stylecycle_wardrobe";
const STORAGE_KEY_OUTFITS = "stylecycle_saved_outfits";

export const wardrobeService = {
  getItems() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_WARDROBE);
      if (raw) {
        const items = JSON.parse(raw);
        // Self-heal known placeholder image assets
        let healed = false;
        const updated = items.map(i => {
          if (i.id === "w-7" && i.image && i.image.includes("1539571696357")) {
            healed = true;
            return { ...i, name: "Brushed Wool Camel Overcoat", image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80" };
          }
          if (i.id === "w-1" && i.image && i.image.includes("1596755094514")) {
            healed = true;
            return { ...i, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80" };
          }
          return i;
        });
        if (healed) {
          safeStorageSetItem(STORAGE_KEY_WARDROBE, updated);
          return updated;
        }
        return items;
      }
    } catch (e) {
      console.warn("Error reading wardrobe", e);
    }
    return INITIAL_WARDROBE;
  },

  addItem(itemData) {
    const items = this.getItems();
    const newItem = {
      ...itemData,
      id: `w-${Date.now()}`,
      addedDate: new Date().toISOString().split("T")[0],
      wearCount: 0,
      isFavorite: false
    };
    items.unshift(newItem);
    const result = safeStorageSetItem(STORAGE_KEY_WARDROBE, items);
    if (!result.success) {
      throw new Error(result.error);
    }
    return newItem;
  },

  updateItem(id, data) {
    const items = this.getItems();
    const index = items.findIndex(i => i.id === id);
    if (index !== -1) {
      items[index] = { ...items[index], ...data };
      const result = safeStorageSetItem(STORAGE_KEY_WARDROBE, items);
      if (!result.success) {
        throw new Error(result.error);
      }
    }
    return items[index];
  },

  deleteItem(id) {
    const items = this.getItems().filter(i => i.id !== id);
    safeStorageSetItem(STORAGE_KEY_WARDROBE, items);
    return items;
  },

  toggleFavorite(id) {
    const items = this.getItems();
    const item = items.find(i => i.id === id);
    if (item) {
      item.isFavorite = !item.isFavorite;
      safeStorageSetItem(STORAGE_KEY_WARDROBE, items);
    }
    return items;
  },

  getSavedOutfits() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_OUTFITS);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.warn("Error reading outfits", e);
    }
    return INITIAL_SAVED_OUTFITS;
  },

  saveOutfit(outfit) {
    const list = this.getSavedOutfits();
    const newOutfit = {
      ...outfit,
      id: `outfit-${Date.now()}`,
      savedAt: new Date().toISOString().split("T")[0]
    };
    list.unshift(newOutfit);
    localStorage.setItem(STORAGE_KEY_OUTFITS, JSON.stringify(list));
    return list;
  },

  getStats(items) {
    const total = items.length;
    const favorites = items.filter(i => i.isFavorite).length;
    const totalWears = items.reduce((sum, i) => sum + (i.wearCount || 0), 0);

    const categories = {};
    const colors = {};

    items.forEach(i => {
      categories[i.category] = (categories[i.category] || 0) + 1;
      colors[i.color] = (colors[i.color] || 0) + 1;
    });

    return {
      total,
      favorites,
      totalWears,
      categories,
      colors,
      sustainabilityScore: Math.min(100, Math.round((totalWears / (total || 1)) * 3.5 + 40))
    };
  }
};
