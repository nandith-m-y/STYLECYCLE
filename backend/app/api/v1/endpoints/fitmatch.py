from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import Dict, Any, Optional, List
import sys
import os

# Add project root to sys.path to allow importing from ai_ml
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../../../"))
if PROJECT_ROOT not in sys.path:
    sys.path.insert(0, PROJECT_ROOT)

from ai_ml.fitmatch.engine import BiometricAIEngine

router = APIRouter()

class MeasurementsInput(BaseModel):
    height: Optional[float] = 172
    chest: Optional[float] = 94
    waist: Optional[float] = 76
    hip: Optional[float] = 98
    shoulder: Optional[float] = 43
    sleeve: Optional[float] = 62
    inseam: Optional[float] = 80
    preferredFit: Optional[str] = "Regular"

class FitScanRequest(BaseModel):
    measurements: MeasurementsInput
    brand: Optional[str] = "Zara"
    category: Optional[str] = "tops"
    preferredFit: Optional[str] = "Regular"
    fabricId: Optional[str] = "stretch_blend"

class ArchetypeRequest(BaseModel):
    measurements: MeasurementsInput

class MatrixRequest(BaseModel):
    measurements: MeasurementsInput
    category: Optional[str] = "tops"
    preferredFit: Optional[str] = "Regular"

@router.post("/scan")
def run_fit_scan(req: FitScanRequest):
    """
    Executes full AI Biometric Scan:
    Returns somatic archetype classification, multi-brand sizing matrix,
    and detailed dimensional grading breakdown for the focused brand.
    """
    try:
        measurements_dict = req.measurements.model_dump()
        result = BiometricAIEngine.run_full_scan(
            measurements=measurements_dict,
            brand=req.brand,
            category=req.category,
            preferred_fit=req.preferredFit,
            fabric_id=req.fabricId
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"FitMatch AI Scan Failed: {str(e)}")

@router.post("/archetype")
def get_archetype(req: ArchetypeRequest):
    """
    Returns somatic silhouette archetype based on biometric coordinate ratios.
    """
    try:
        measurements_dict = req.measurements.model_dump()
        archetype = BiometricAIEngine.classify_archetype(measurements_dict)
        return {"status": "success", "archetype": archetype}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/matrix")
def get_brand_matrix(req: MatrixRequest):
    """
    Simultaneously computes sizing predictions across 5 major fashion houses.
    """
    try:
        measurements_dict = req.measurements.model_dump()
        matrix = BiometricAIEngine.generate_multi_brand_matrix(
            measurements=measurements_dict,
            category=req.category,
            preferred_fit=req.preferredFit
        )
        return {"status": "success", "matrix": matrix}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/recommend")
def get_single_recommendation(req: FitScanRequest):
    """
    Returns single brand fit calculation with fabric stretch adjustments.
    """
    try:
        measurements_dict = req.measurements.model_dump()
        rec = BiometricAIEngine.calculate_brand_fit(
            measurements=measurements_dict,
            brand=req.brand,
            category=req.category,
            preferred_fit=req.preferredFit,
            fabric_id=req.fabricId
        )
        return {"status": "success", "recommendation": rec}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

