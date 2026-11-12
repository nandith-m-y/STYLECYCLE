from fastapi import APIRouter
from backend.app.api.v1.endpoints import fitmatch, stylist, recommendations, health

api_router = APIRouter()

api_router.include_router(health.router, tags=["Health"])
api_router.include_router(fitmatch.router, prefix="/fitmatch", tags=["FitMatch AI"])
api_router.include_router(stylist.router, prefix="/stylist", tags=["Stylist AI"])
api_router.include_router(recommendations.router, prefix="/recommendations", tags=["Smart Shopping AI"])
