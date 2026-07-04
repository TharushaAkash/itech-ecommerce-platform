import mongoose from "mongoose";
const studentSchema = new mongoose.Schema({  //data types in the collection
    name: String,
    age: Number,
    city: String
})


const Student = mongoose.model("Student" , studentSchema);  //Collection name : students  manage the crud operations

//IN javascript we send something or access to this for outside we use export
export default Student;