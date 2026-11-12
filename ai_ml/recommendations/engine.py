"""
STYLECYCLE - AI Smart Shopping & Complementary Recommendation Engine
Identifies wardrobe gaps and surfaces complementary marketplace listings.
"""

from typing import Dict, Any, List

class SmartShoppingAIEngine:
    @classmethod
    def recommend_complementary(
        cls,
        wardrobe: List[Dict[str, Any]],
        marketplace_products: List[Dict[str, Any]],
        limit: int = 6
    ) -> List[Dict[str, Any]]:
        categories_owned = set(w.get("category") for w in wardrobe if w.get("category"))
        
        scored = []
        for p in marketplace_products:
            score = 75
            cat = p.get("category", "")
            # Boost score if category is under-represented in user closet
            if cat not in categories_owned:
                score += 15
            if p.get("condition") in ["New with tags", "Like new"]:
                score += 5
            scored.append((score, p))
            
        scored.sort(key=lambda x: x[0], reverse=True)
        return [item[1] for item in scored[:limit]]
