import express from "express";
import { createUser, getUserData, loginUser, updatePassword, updateUserData } from "../controllers/userController.js";



const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.post("/login", loginUser);
userRouter.put("/password", updatePassword);
userRouter.get("/me", getUserData);
userRouter.put("/", updateUserData);




export default userRouter;