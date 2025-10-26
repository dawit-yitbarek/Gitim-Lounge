import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";
import authRoutes from './routes/authRoutes.js';
import userRoutes from "./routes/userRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js";
import poemRoutes from "./routes/poemRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";
import feedBackRoutes from "./routes/feedBackRoutes.js";


dotenv.config();
const app = express();
const port = process.env.PORT;

app.use((req, res, next) => {
  console.log("🔍 Request Origin:", req.headers.origin);
  console.log("✅ Allowed Origin:", process.env.FRONTEND_URL);
  next();
});


app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/poems', poemRoutes);
app.use('/api/like', likeRoutes);
app.use('/api/feedback', feedBackRoutes);

// Add a health check endpoint to confirm backend is running
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});


app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
