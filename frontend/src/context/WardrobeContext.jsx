import React, { createContext, useContext, useState, useEffect } from "react";
import { wardrobeService } from "../services/wardrobeService";

const WardrobeContext = createContext();

export const WardrobeProvider = ({ children }) => {
  const [wardrobe, setWardrobe] = useState(() => wardrobeService.getItems());
  const [outfits, setOutfits] = useState(() => wardrobeService.getSavedOutfits());

  const addItem = (itemData) => {
    const created = wardrobeService.addItem(itemData);
    setWardrobe((prev) => [created, ...prev]);
    return created;
  };

  const updateItem = (id, data) => {
    const updated = wardrobeService.updateItem(id, data);
    setWardrobe((prev) => prev.map(i => i.id === id ? updated : i));
    return updated;
  };

  const deleteItem = (id) => {
    const remaining = wardrobeService.deleteItem(id);
    setWardrobe([...remaining]);
  };

  const toggleFavorite = (id) => {
    const updated = wardrobeService.toggleFavorite(id);
    setWardrobe([...updated]);
  };

  const saveOutfit = (outfit) => {
    const updatedOutfits = wardrobeService.saveOutfit(outfit);
    setOutfits([...updatedOutfits]);
    return updatedOutfits;
  };

  const wardrobeStats = wardrobeService.getStats(wardrobe);

  return (
    <WardrobeContext.Provider
      value={{
        wardrobe,
        outfits,
        addItem,
        updateItem,
        deleteItem,
        toggleFavorite,
        saveOutfit,
        wardrobeStats
      }}
    >
      {children}
    </WardrobeContext.Provider>
  );
};

export const useWardrobe = () => useContext(WardrobeContext);
