import express from 'express';
import { signUp, signIn, logOut, verifyCode, sendResetCode, resetPassword } from '../controllers/authController.js';
import { refreshToken } from '../controllers/refreshController.js';
import { forgotPasswordLimiter } from '../middleware/rateLimit.js';
import { registrationLimiter } from '../middleware/rateLimit.js';

const router = express.Router();

router.post('/register', registrationLimiter, signUp);
router.post('/login', signIn);
router.get('/refresh', refreshToken);
router.post('/logout', logOut);
router.post('/verify-code', verifyCode);
router.post('/send-reset-code', forgotPasswordLimiter, sendResetCode);
router.put('/reset-password', resetPassword);

export default router;