import express from "express";
import { createUser, loginUser, updatePassword } from "../controllers/userController.js";



const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.post("/login", loginUser);
userRouter.post("/password", updatePassword);



export default userRouter;