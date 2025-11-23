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
- Handle likes with uniqueness constraints  
- Manage testimonials  
- Secure new user registration via `pending_users` (email verification system)

---

## 🛠️ Tech Stack

### **Frontend**
- React + Vite  
- Tailwind CSS  
- Axios  

### **Backend**
- Node.js  
- Express  
- PostgreSQL  
- Cloudinary  
- Brevo Email API  
- JSON Web Tokens (JWT)



---

## 🗄️ Database Schema

The backend uses PostgreSQL with the following tables:

```sql
CREATE TABLE IF NOT EXISTS public.users
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  profile_image TEXT DEFAULT 'avatar.png',
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.poems
(
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES public.users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  content TEXT[] NOT NULL,
  description TEXT,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.likes
(
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES public.users(id) ON DELETE CASCADE,
  poem_id INTEGER REFERENCES public.poems(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT now(),
  UNIQUE (user_id, poem_id)
);

CREATE TABLE IF NOT EXISTS public.testimonials
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  image TEXT NOT NULL,
  message TEXT NOT NULL,
  userid INTEGER NOT NULL REFERENCES public.users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public.pending_users
(
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE,
  password TEXT,
  code TEXT,
  expires_at TIMESTAMP
);


⚙️ Installation & Setup
Clone the repository and install dependencies for both frontend and backend:

git clone https://github.com/dawit-yitbarek/Gitim-Lounge.git
cd Gitim-Lounge

📦 Backend Setup
cd backend
npm install

Create a .env file inside /backend:

DATABASE_URL=your_postgres_url
FRONTEND_URL=your_frontend_url
BACKEND_URL=your_backend_url
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_brevo_verified_email
BREVO_API_KEY=your_brevo_api_key
CONTACT_RECEIVER_EMAIL=email_to_receive_messages
PORT=port_number

Run the backend:
node server.js

💻 Frontend Setup
cd frontend
npm install

Create a .env file inside /frontend:

VITE_BACKEND_URL=your_backend_url
VITE_FRONTEND_URL=your_frontend_url

Run the frontend:
npm run dev


🌐 Deployment
Frontend deployed at:
https://gitimlounge.vercel.app/


📌 Future Improvements 

Add comment system to poems

Add dark/light theme toggle

Add poem drafts

Add pagination and infinite scroll

Add user-to-user messaging

Add admin dashboard for managing all content


🙌 Feedback & Contributions

Issues and contributions are welcome. Feel free to submit pull requests or bug reports.
