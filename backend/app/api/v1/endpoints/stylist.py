from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, Any, Optional, List
import sys
import os

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../../../"))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from ai_ml.stylist.engine import PersonalStylistAIEngine

router = APIRouter()

class StylistGenerateRequest(BaseModel):
    wardrobe: List[Dict[str, Any]] = []
    occasion: Optional[str] = "Casual"
    style: Optional[str] = "Minimalist"
    colorMood: Optional[str] = "Earth & Sand Tones"
    weather: Optional[str] = "mild"

class SwapPieceRequest(BaseModel):
    currentPieces: Dict[str, Any]
    slot: str
    wardrobe: List[Dict[str, Any]] = []
    occasion: Optional[str] = "Casual"
    style: Optional[str] = "Minimalist"

@router.post("/generate")
def generate_ai_outfit(req: StylistGenerateRequest):
    """
    Executes AI Styling Engine:
    Synthesizes a 4-piece ensemble with chromatic harmony (60-30-10 rule),
    thermal context layering, synergy scores, and actionable editorial advice.
    """
    try:
        ensemble = PersonalStylistAIEngine.generate_outfit(
            wardrobe=req.wardrobe,
            occasion=req.occasion,
            style=req.style,
            color_mood=req.colorMood,
            weather=req.weather
        )
        return {"status": "success", "ensemble": ensemble}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Stylist Generation Failed: {str(e)}")

@router.post("/swap")
def swap_outfit_piece(req: SwapPieceRequest):
    """
    Swaps an individual garment piece using AI compatibility scoring.
    """
    try:
        result = PersonalStylistAIEngine.swap_piece(
            current_pieces=req.currentPieces,
            slot=req.slot,
            wardrobe=req.wardrobe,
            occasion=req.occasion,
            style=req.style
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Piece Swap Failed: {str(e)}")
