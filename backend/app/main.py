"""
STYLECYCLE - FastAPI AI & Application Backend
Powers real-time biometric scanning, somatic classification, and neural outfit synthesis.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sys
import os

# Ensure STYLECYCLE root is on sys.path
STYLECYCLE_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))
if STYLECYCLE_ROOT not in sys.path:
    sys.path.insert(0, STYLECYCLE_ROOT)

from backend.app.api.v1.api import api_router

app = FastAPI(
    title="STYLECYCLE AI Backend Engine",
    description="High-performance backend API powering AI Stylist and FitMatch Biometric Engine.",
    version="2.4.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API Router
app.include_router(api_router, prefix="/api/v1")

@app.get("/")
def root():
    return {
        "message": "STYLECYCLE AI Backend Engine is operational.",
        "documentation": "/docs",
        "apiPrefix": "/api/v1"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app.main:app", host="127.0.0.1", port=8000, reload=True)
