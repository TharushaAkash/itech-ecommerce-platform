import Student from "../models/student.js"

/*export function createStudent(req,res){
    
    const newStudent = new Student({
        name: req.body.name,
        age: req.body.age,
        city: req.body.city
    })

    newStudent.save().then(  //NewStudent is an object of Student model
        ()=>{
            res.json({
                Message: "Student created successfully"
            })
        }
    )
}*/

export async function createStudent(req,res){
    try{
        const newStudent = new Student(
            {
                name: req.body.name,
                age: req.body.age,
                city: req.body.city
            }
        )

        await newStudent.save();  
        res.json({
            Message: "Student created successfully"
        })
    }catch(err){
        console.log(err.message)
    }

    
}




export async function getStudentById(req,res){
    try{
        await Student.findOne({name: req.body.email})
        res.json({
            Message: "Student found successfully"
        
        })
    }catch(err){
        res.json({
            Message: "Student not found"
        })
        console.log(err.message)
    }
}


/*export function getStudentById(req,res){
    Student.findOne({name: req.body.name}).then(
        (student)=>{
            res.json(student.age, student.city);
        }
    )
}*/