import express from 'express';
import mongoose from 'mongoose';
import Student from './models/student.js';
import studentRouter from './routers/studentRouter.js'; 
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import jwt, { decode } from 'jsonwebtoken';
import authenticateUser from './middlewares/authenticate.js';


const app = express();
const omdm_api_key = "a2ae95f2"
const mongourl = "mongodb+srv://admin:1234@cluster0.tp12jif.mongodb.net/icomputers?appName=Cluster0"

app.use(express.json());  //middleware to parse json data from request body

mongoose.connect(mongourl).then(
    ()=>{
        console.log("Connected to MongoDB");
    }
)

app.use(authenticateUser)

app.use("/students" , studentRouter);  //localhost:3000/students
app.use("/products", productRouter);
app.use("/users", userRouter);

app.listen(3000, ()=>{
    console.log("Server started....")
});













