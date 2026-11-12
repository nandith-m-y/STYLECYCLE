from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, Any, Optional, List
import sys
import os

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../../../"))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from ai_ml.recommendations.engine import SmartShoppingAIEngine

router = APIRouter()

class RecommendationsRequest(BaseModel):
    wardrobe: List[Dict[str, Any]] = []
    marketplaceProducts: List[Dict[str, Any]] = []
    limit: Optional[int] = 6

@router.post("/complementary")
def get_complementary_recommendations(req: RecommendationsRequest):
    try:
        results = SmartShoppingAIEngine.recommend_complementary(
            wardrobe=req.wardrobe,
            marketplace_products=req.marketplaceProducts,
            limit=req.limit
        )
        return {"status": "success", "recommendations": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

