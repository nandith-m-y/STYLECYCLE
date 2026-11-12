from fastapi import APIRouter
import time

router = APIRouter()
START_TIME = time.time()

@router.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "STYLECYCLE AI Backend Engine",
        "version": "2.4.0",
        "uptimeSeconds": round(time.time() - START_TIME, 1),
        "aiModelsLoaded": [
            "BiometricAIEngine (v2.4)",
            "PersonalStylistAIEngine (v3.1)",
            "SmartShoppingAIEngine (v1.2)"
        ]
    }

