import express from 'express';
import Student from '../models/student.js';
import { createStudent, getStudentById } from '../controllers/studentController.js';

const studentRouter = express.Router();

//Get Request to fetch all students
studentRouter.get("/", getStudentById);


//Post Request to create a student

studentRouter.post("/", createStudent)

export default studentRouter;    //One main thing → use export default