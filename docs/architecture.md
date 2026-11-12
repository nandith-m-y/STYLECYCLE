# STYLECYCLE - System Architecture

## 1. High-Level Architecture
STYLECYCLE follows a modular, decoupled architecture:
- **Client Tier**: React 18+ Single Page Application built with Vite and Tailwind CSS.
- **API Tier (Future Phase)**: FastAPI asynchronous REST services with OpenAPI 3.0 specification.
- **Persistence Tier (Future Phase)**: PostgreSQL relational database with SQLAlchemy ORM and Alembic migrations.
- **AI/ML Services Tier (Future Phase)**: Python services for size prediction, computer vision item tagging, and embedding-based outfit recommendation.
- **Media Storage Tier**: Local sandbox in development; Cloudinary / S3 in production.

## 2. Directory Separation
- `frontend/`: UI, state management, routing, presentation layer.
- `backend/`: FastAPI application code (Phase 2).
- `database/`: Schema DDL, migrations, and seed scripts.
- `ai_ml/`: Vision models, FitMatch algorithms, and recommendation graphs.
- `storage/`: Uploaded asset storage.
- `docs/`: Technical specifications and architectural decision records.
- `deployment/`: Containerization manifests and CI/CD pipelines.
