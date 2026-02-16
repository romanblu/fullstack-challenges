
# TC Marketplace

**Overview**
- **Project:**: A full-stack marketplace prototype focused on plant genetics through tissue culture, enabling the sale of explants and related materials. It also includes an articles section on plant acclimatization and lab materials, allowing contributors to share and demonstrate their expertise. The system features a Node/Express backend (API + admin tools) and a React + Vite frontend (consumer and admin interfaces), MongoDB for the database, AWS S3 and CloudFront for image upload and serving.

**Table of contents**
- **Overview:**: Quick summary of the project
- **Features:**: What the project implements
- **Architecture:**: Folder-level layout and responsibilities
- **Backend:**: How to run and env vars
- **Frontend:**: How to run and env vars
- **Fake data & seeds:**: Where sample data lives and seed commands
- **Contributing:**: Notes for contributors

**Features**
- **User management:**: Registration, login, roles (buyer, seller), update user details, update seller/store 
- **Products:**: Product CRUD, images S3 and CloudFront integration, product variants
- **Stores / sellers:**: Store profiles and listing by sellers
- **Categories & inventory:**: Category management and inventory model support
- **Cart & orders:**: Shopping cart API endpoints and order model 
- **Blog:**: Simple blog module for content pages using markdown
- **Upload:**: Image upload utilities and S3 helpers

**Architecture**
- **Backend:**: [backend](backend/) — Express API, MongoDB models, modular routes located in `modules/`.
- **Frontend:**: [frontend](frontend/) — React app (Vite) in `src/` with services that call the API.
- **Fake data:**: [fake-data](../fake-data) — sample product folders used for import or testing.

**Backend (quickstart)**
- **Main files:**: [backend/server.js](backend/server.js), [backend/package.json](backend/package.json)
- **Install:**:

	1. `cd backend`
	2. `npm install`

- **Environment variables:**: Create a `.env` file (example values) with at least:

	- `MONGO_URI` : MongoDB connection string
	- `JWT_SECRET` : Secret for signing JWTs
	- `JWT_EXPIRES_IN` : (optional) token expiry, e.g. `7d`
	- `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` : AWS credentials for S3 uploads
	- `AWS_REGION` : AWS region for the S3 bucket
	- `AWS_S3_BUCKET` : S3 bucket name used by upload utilities
	- `PORT` : (optional) server port, defaults to `5000`

- **Run (development):**: `npm run dev` (uses `nodemon`)
- **Run (production):**: `npm start`
- **Seed categories:**: `npm run seed:categories` (script: [backend/scripts/seedCategories.js](backend/scripts/seedCategories.js))

**Frontend (quickstart)**
- **Main files:**: [frontend/package.json](frontend/package.json), [frontend/src](frontend/src)
- **Install:**:

	1. `cd frontend`
	2. `npm install`

- **Environment variables:**: Frontend expects a Vite env var to point to the API:

	- `VITE_API_URL` : base API URL (e.g. `http://localhost:5000/api`)

- **Run (dev):**: `npm run dev`
- **Build:**: `npm run build`

**Fake data & seeds**
- **Location:**: [../fake-data/plants-products](../fake-data/plants-products)
- **Usage:**: The folder contains sample product folders (each with `product.txt` or `product-details.txt`) that can be used when importing or testing product creation.

**Notable modules & files**
- **Auth:**: `modules/auth` — registration, login, JWT utils ([backend/utils/auth.js](backend/utils/auth.js)).
- **Upload:**: `modules/upload` — S3 client and helpers; see [backend/modules/upload/upload.utils.js](backend/modules/upload/upload.utils.js) for required AWS env vars.
- **Database connection:**: [backend/config/db.js](backend/config/db.js) uses `MONGO_URI`.

**Developer notes**
- **API base path:**: Backend routes are mounted under `/api/*` (see `server.js`).
- **Logging:**: Winston logger is used under `utils/logger.js` and Morgan is available for request logs.
- **Auth:**: JWT tokens are signed with `JWT_SECRET` and consumed by middleware in `middleware/auth.js`.

**Contributing**
- **Bugs & features:**: Open an issue with reproduction steps and desired behavior.
- **Local dev flow:**: Run the backend and frontend concurrently (two terminals). Seed categories before creating category-dependent resources.


