# STYLECYCLE - API Specification (FastAPI Ready)

## Base URL
Development: `http://localhost:8000/api/v1`

## Planned Endpoints
- `POST /auth/register` - Create user profile
- `POST /auth/login` - Authenticate & obtain JWT
- `GET /products` - List products with pagination, filters, sorting
- `GET /products/{id}` - Retrieve detailed product info
- `POST /products` - Create new listing
- `POST /cart/items` - Add item to cart
- `POST /orders` - Place order
- `POST /exchanges` - Submit exchange request
- `POST /fitmatch/predict` - Compute size recommendation
- `GET /wardrobe` - Retrieve user wardrobe items
- `POST /stylist/recommend` - Generate outfit matrix
