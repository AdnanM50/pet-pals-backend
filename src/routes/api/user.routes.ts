import { Router } from "express";
import { findUser, getUserProfile, userLogout, sendOtp, userLogin, userRegistration } from "../../controllers/user.controller";
import { isAdmin } from "../../middlewares/auth.middleware";
import { log } from "console";
import { stat } from "fs";
// import { isUser } from "../../middlewares/auth.middleware";




const userRoutes = Router();


userRoutes.post('/register', userRegistration);
userRoutes.post('/login', userLogin);
userRoutes.post('/send-otp', sendOtp);
userRoutes.get('/find', findUser);
userRoutes.get('/profile',getUserProfile); 
userRoutes.post('/logout', userLogout);
userRoutes.get('/get', (req, res) => {
    res.send(
     {status: '200', message: 'success', data: 'get user',success: true}
    )
})

export default userRoutes;