import express from 'express';
import mongoose from 'mongoose';
import Student from './models/student.js';
import studentRouter from './routers/studentRouter.js'; 
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import jwt, { decode } from 'jsonwebtoken';
import authenticateUser from './middlewares/authenticate.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const app = express();
const omdm_api_key = "a2ae95f2"
const mongourl = process.env.MONGO_URL

app.use(cors());
app.use(express.json()); 

//middleware to parse json data from request body

mongoose.connect(mongourl).then(
    ()=>{
        console.log("Connected to MongoDB");
    }
)



app.use("/students" , studentRouter);  //localhost:3000/students
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use(authenticateUser);

app.listen(3000, ()=>{
    console.log("Server started....")
});













