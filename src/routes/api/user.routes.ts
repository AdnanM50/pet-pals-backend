import { Router } from "express";
import { findUser, sendOtp, userRegistration } from "../../controllers/user.controller";
// import { get } from "http";



const userRoutes = Router();


userRoutes.post('/register', userRegistration);
userRoutes.post('/send-otp', sendOtp);
userRoutes.get('/find', findUser);
userRoutes.get('/get', (req, res) => {
    res.send('Hello Adnan')
})

export default userRoutes;