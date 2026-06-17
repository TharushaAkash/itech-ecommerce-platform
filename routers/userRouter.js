import express from "express";
import { createUser, getUserData, googleLogin, loginUser, sendOtp, updatePassword, updateUserData, verifyOtpAndPassword } from "../controllers/userController.js";



const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.post("/login", loginUser);
userRouter.put("/password", updatePassword);
userRouter.get("/me", getUserData);
userRouter.put("/", updateUserData);
userRouter.post("/google-login", googleLogin);
userRouter.post("/send-otp", sendOtp);
userRouter.post("/verify-otp", verifyOtpAndPassword);




export default userRouter;