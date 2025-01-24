import { Router } from "express";
import { findUser, getUserProfile, sendOtp, userLogin, userRegistration } from "../../controllers/user.controller";
// import { get } from "http";



const userRoutes = Router();


userRoutes.post('/register', userRegistration);
userRoutes.post('/login', userLogin);
userRoutes.post('/send-otp', sendOtp);
userRoutes.get('/find', findUser);
userRoutes.get('/profile',getUserProfile); 
userRoutes.get('/get', (req, res) => {
    res.send('Hello Adnan')
})

export default userRoutes;