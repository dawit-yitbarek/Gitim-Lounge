# Gitim Lounge

Gitim Lounge is a poem publishing and reading platform where users can browse poems, read them in an immersive UI, or create accounts to publish their own. The project includes user profiles, poem management, sorting features, clean typography, and a full-stack architecture powered by React, Node.js, Express, and PostgreSQL.

---

## 📖 Features

### 🌟 User Features
- Browse all poems with clean, beautiful typography  
- Sort poems by **latest** or **most liked**  
- Create accounts and log in securely  
- Publish poems (title, content array, description)  
- Like poems (one like per user per poem)  
- View personalized profile pages  
- Edit profile image and username  
- Read poems in a distraction-free, immersive UI  
- Contact form (Brevo-powered)

### 🔧 Admin / Backend Features
- Full CRUD for poems  
- Cloudinary image uploads (profile pictures, testimonial images)  
- JWT-based authentication  
# Gitim Lounge

Gitim Lounge is a full-stack poem publishing and reading platform. It lets readers browse and enjoy poems in a distraction-free UI and allows registered users to publish, like, and manage their poems.

**Key ideas:** simple UX for reading, fast browsing, user profiles, and a small, maintainable backend using Node.js + Express with PostgreSQL.

**Live app:** https://gitimlounge.vercel.app/

---

**Table of contents**
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Quickstart (Local)](#quickstart-local)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Environment Variables](#environment-variables)
- [Database](#database)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Contact](#contact)

---

## Features

#!/bin/bash
# README replaced with a cleaned and consolidated version

# Gitim Lounge

Gitim Lounge is a full-stack poem publishing and reading platform. It lets readers browse and enjoy poems in a distraction-free UI and allows registered users to publish, like, and manage their poems.

**Key ideas:** simple UX for reading, fast browsing, user profiles, and a small, maintainable backend using Node.js + Express with PostgreSQL.

**Live frontend:** https://gitimlounge.vercel.app/

---

**Table of contents**
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Quickstart (Local)](#quickstart-local)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Environment Variables](#environment-variables)
- [Database](#database)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Contact](#contact)

---

## Features

- Browse poems with clean typography and a distraction-free reader
- Create an account, edit profile, and upload a profile image
- Publish poems (title, description, content array)
- Like poems (enforced one-like-per-user)
- Sort/filter poems (latest / most liked)
- Cloudinary image uploads for profile/testimonial images
- JWT-based authentication and email verification flow for new users

## Tech Stack

- **Frontend:** React + Vite, Tailwind CSS, Axios
- **Backend:** Node.js, Express
- **Database:** PostgreSQL (using `pg`)
- **Storage / Email:** Cloudinary (images), Brevo (email)
- **Auth:** JSON Web Tokens (JWT)

## Repository Structure (important parts)

- `backend/` — Express API, controllers, middleware, `server.js`
- `frontend/` — Vite + React app in `src/`
- `models/` — DB and Cloudinary helper (`backend/models/`)

## Quickstart (Local)

Prerequisites:
- Node.js (v16+ recommended)
- PostgreSQL database
- A Cloudinary account (for image uploads)

Clone the repo and install dependencies:

```powershell
git clone https://github.com/dawit-yitbarek/Gitim-Lounge.git
cd Gitim-Lounge
```

### Backend

```powershell
cd backend
npm install
# development (auto-restart) uses nodemon
npm run dev
# or run in production mode
npm start
```

Server entry: `backend/server.js` (the `start` script runs `node server.js`).

### Frontend

```powershell
cd frontend
npm install
npm run dev
```

The frontend is a Vite app — `npm run dev` will start the dev server (usually on `http://localhost:5173`).

## Environment Variables

Create a `.env` file in `backend/` with the following variables (example):

```env
DATABASE_URL=postgres://user:password@host:port/database
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:5000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_verified_email@domain.com
# Gitim Lounge

Gitim Lounge is a full-stack poem publishing and reading platform. It lets readers browse and enjoy poems in a distraction-free UI and allows registered users to publish, like, and manage their poems.

**Key ideas:** simple UX for reading, fast browsing, user profiles, and a small, maintainable backend using Node.js + Express with PostgreSQL.

**Live frontend:** https://gitimlounge.vercel.app/

---

**Table of contents**
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Quickstart (Local)](#quickstart-local)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Environment Variables](#environment-variables)
- [Database](#database)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Contact](#contact)

---

## Features

- Browse poems with clean typography and a distraction-free reader
- Create an account, edit profile, and upload a profile image
- Publish poems (title, description, content array)
- Like poems (enforced one-like-per-user)
- Sort/filter poems (latest / most liked)
- Cloudinary image uploads for profile/testimonial images
- JWT-based authentication and email verification flow for new users

## Tech Stack

- **Frontend:** React + Vite, Tailwind CSS, Axios
- **Backend:** Node.js, Express
- **Database:** PostgreSQL (using `pg`)
- **Storage / Email:** Cloudinary (images), Brevo (email)
- **Auth:** JSON Web Tokens (JWT)

## Repository Structure (important parts)

- `backend/` — Express API, controllers, middleware, `server.js`
- `frontend/` — Vite + React app in `src/`
- `models/` — DB and Cloudinary helper (`backend/models/`)

## Quickstart (Local)

Prerequisites:
- Node.js (v16+ recommended)
- PostgreSQL database
- A Cloudinary account (for image uploads)

Clone the repo and install dependencies:

```powershell
git clone https://github.com/dawit-yitbarek/Gitim-Lounge.git
cd Gitim-Lounge
```

### Backend

```powershell
cd backend
npm install
# development (auto-restart) uses nodemon
npm run dev
# or run in production mode
npm start
```

Server entry: `backend/server.js` (the `start` script runs `node server.js`).

### Frontend

```powershell
cd frontend
npm install
npm run dev
```

The frontend is a Vite app — `npm run dev` will start the dev server (usually on `http://localhost:5173`).

## Environment Variables

Create a `.env` file in `backend/` with the following variables (example):

```env
DATABASE_URL=postgres://user:password@host:port/database
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:5000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_verified_email@domain.com
BREVO_API_KEY=your_brevo_api_key
CONTACT_RECEIVER_EMAIL=receiver@domain.com
PORT=5000
```

And in `frontend/`, create a `.env` (Vite) with keys like:

```env
VITE_BACKEND_URL=http://localhost:5000
VITE_FRONTEND_URL=http://localhost:5173
```

## Database

This project uses PostgreSQL. The backend expects the database URL in `DATABASE_URL`. Example tables used by the app include `users`, `poems`, `likes`, `testimonials`, and `pending_users` (for email verification). If you prefer, run the SQL schema provided in the project or use your own migrations.

Example (simplified) SQL for core tables:

```sql
CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(100), email VARCHAR(150) UNIQUE, password TEXT, profile_image TEXT, created_at TIMESTAMP DEFAULT now());
CREATE TABLE poems (id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, title VARCHAR(200), content TEXT[], description TEXT, likes_count INTEGER DEFAULT 0, created_at TIMESTAMP DEFAULT now());
CREATE TABLE likes (id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users(id), poem_id INTEGER REFERENCES poems(id), UNIQUE (user_id, poem_id));
```

## Deployment

- Frontend: deployed to Vercel (see `https://gitimlounge.vercel.app/`).
- Backend: any Node.js host (Heroku, Render, Railway, etc.) that supports environment variables and exposes the API endpoint. Ensure `DATABASE_URL` and Cloudinary/Brevo keys are set in the host environment.

Tips:
- Build the frontend for production (`npm run build` in `frontend`) and serve the static files from a static hosting provider, or configure your backend to serve the built files.

## Contributing

Contributions, issues and feature requests are welcome. If you'd like to contribute:

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes and push: `git push origin feature/your-feature`
4. Open a pull request describing your changes

Please open issues for bugs or feature requests before starting large work.

## Contact

If you have questions or want to report issues, please open an issue in the repository or contact the maintainer.

---

Thank you for checking out Gitim Lounge — enjoy reading and sharing poems!
