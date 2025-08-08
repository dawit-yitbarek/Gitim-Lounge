import express from 'express';
import { authUser } from '../middleware/authMiddleware.js'
import { getAuthorPoems, getFeaturedPoems, postPoem, deletePoem, getAllPoems } from '../controllers/poemController.js';

const router = express.Router();

router.get('/featured', getFeaturedPoems);
router.get('/', getAllPoems);
router.get('/me', authUser, getAuthorPoems);
router.get('/reading/:authorId', getAuthorPoems);
router.post('/', authUser, postPoem);
router.delete('/:poemId', authUser, deletePoem);


export default router;