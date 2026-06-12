import express from "express";
import { createUser, getUserData, googleLogin, loginUser, updatePassword, updateUserData } from "../controllers/userController.js";



const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.post("/login", loginUser);
userRouter.put("/password", updatePassword);
userRouter.get("/me", getUserData);
userRouter.put("/", updateUserData);
userRouter.post("/google-login", googleLogin);




export default userRouter;