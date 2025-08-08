import express from 'express';
import { getTestimonials, postTestimonials } from '../controllers/feedBackController.js';
import { authUser } from '../middleware/authMiddleware.js'

const router = express.Router();

router.get('/', getTestimonials);
router.post('/', authUser, postTestimonials);

export default router;