import express from 'express';
import { signup, login, logout, verifyEmail, forgotPassword, resetPassword, profileDetails, updateProfile } from '../controllers/auth.controller';
import { verifyUser } from '../middleware/auth.middleware';
const router = express.Router();

router.post("/signup", signup);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post('/login', login);
router.post('/logout', logout);
router.get('/profile-details/:id', profileDetails);
router.put('/profile-details',verifyUser, updateProfile);

// For testing purposes
router.get('/signup', (req, res) => {
    res.send('This is a GET request to signup. Use POST to actually sign up.');
});

export default router;
