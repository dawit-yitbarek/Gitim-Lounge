import express from 'express';
import { checkLike, likePoem } from '../controllers/likeController.js';
import { authUser } from '../middleware/authMiddleware.js'

const router = express.Router();

router.get('/:poemId/status', authUser, checkLike);
router.post('/:poemId', authUser, likePoem);

export default router;