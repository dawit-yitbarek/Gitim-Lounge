import express from 'express';
import { getUser, updateProfile, getAuthor, sendMessage } from '../controllers/userController.js';
import { authUser } from '../middleware/authMiddleware.js'
import { sendMessageLimiter } from '../middleware/rateLimit.js';

const router = express.Router();

router.get('/', authUser, getUser);
router.put('/update-profile', authUser, updateProfile);
router.get('/author/:authorId', getAuthor);
router.post('/send-message', sendMessageLimiter, sendMessage);

export default router;