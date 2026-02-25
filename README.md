# FJ-BE-R2 — Full Stack Project (Frontend + Backend)

A full‑stack web application with:
- **Backend**: Node.js + Express (REST API)
- **Frontend**: React (SPA)

> LIVE SITE:[https://persona-finance-dashboard.netlify.app/](https://sandeepanchakraborty.github.io/FJ-BE-R2-Sandeepan-Chakraborty---Vellore_Institute-_of_technology_Bhopal-/sign-in)
> Repo: `sandeepanchakraborty/FJ-BE-R2-Sandeepan-Chakraborty---Vellore_Institute-_of_technology_Bhopal-`

---

## Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
  - [Run Backend](#run-backend)
  - [Run Frontend](#run-frontend)
- [API](#api)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Author](#author)
- [License](#license)

---

## Project Overview
This repository contains a **React frontend** and an **Express backend**.
The backend exposes REST endpoints under:

- **Base API path:** `/api-v1`
- **Port:** `8000` by default (or `PORT` from `.env`)

The frontend is a client application that consumes the backend APIs.

---

## Tech Stack

### Backend
- Node.js
- Express.js
- CORS
- dotenv (environment variables)

### Frontend
- React
- react-router-dom (routing)

---

## Repository Structure
```text
.
├── backend/                # Express API server
└── frontend/               # React web app
```

---

## Setup & Installation

### Prerequisites
- **Node.js** (recommended: LTS)
- **npm** (comes with Node) or yarn/pnpm

### Clone
```bash
git clone https://github.com/sandeepanchakraborty/FJ-BE-R2-Sandeepan-Chakraborty---Vellore_Institute-_of_technology_Bhopal-.git
cd FJ-BE-R2-Sandeepan-Chakraborty---Vellore_Institute-_of_technology_Bhopal-
```

---

## Environment Variables

### Backend (`backend/.env`)
Create a `.env` file inside `backend/`.

Minimal example:
```env
PORT=8000
```

> If your backend uses DB / JWT / third‑party APIs, add them here too (e.g., `MONGO_URL`, `JWT_SECRET`, etc.).  
> Tell me what services you used and I’ll fill this section precisely.

---

## Running the Project

### Run Backend
```bash
cd backend
npm install
npm run dev
```

If there is no `dev` script configured, use:
```bash
npm start
```

Backend will start on:
- `http://localhost:8000` (default)
- API base: `http://localhost:8000/api-v1`

---

### Run Frontend
Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

If your frontend is CRA instead of Vite, use:
```bash
npm start
```

Frontend usually runs on:
- `http://localhost:5173` (Vite default) or `http://localhost:3000` (CRA default)

---

## API

### Base URL
All endpoints are mounted under:
```text
/api-v1
```

### 404 Handling
Unknown routes return a JSON 404 response.

> If you share `backend/routes/index.js` (or tell me your endpoints), I’ll add a clean endpoint table like:
> - Method, Route, Description, Auth required, Sample request/response.

---

## Troubleshooting

### 1) CORS errors
If frontend can’t call backend:
- Ensure backend is running
- Ensure API URL in frontend points to backend (e.g., `http://localhost:8000/api-v1`)
- Update CORS config if needed

### 2) Port already in use
Change in `backend/.env`:
```env
PORT=8001
```

### 3) Environment variables not loading
Make sure:
- `.env` is inside `backend/`
- backend calls `dotenv.config()` (it does)

---

## Contributing
1. Fork the repo
2. Create a branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m "Add my feature"`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

---

## Author
**Sandeepan Chakraborty**  
GitHub: https://github.com/sandeepanchakraborty

---

## License
Add a license if needed (e.g., MIT). If this is an academic project, you can also mention usage restrictions here.
