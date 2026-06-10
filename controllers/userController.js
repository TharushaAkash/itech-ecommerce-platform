import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



//Create user
export async function createUser(req, res){
    // if(req.user == null){
    //     res.status(401).json(
    //         {
    //             message: "Unauthorized User, Please login to create user"
    //         }
    //     )
    //     return;
    // }
    // if(!req.user.isAdmin){
    //     res.status(403).json(
    //         {
    //             Message: "Only Admin can create user"
    //         }
    //     )
    //     return;
    // }

    try{
        const data = req.body

        const passwordHasg = bcrypt.hashSync(data.password, 10)
        console.log(passwordHasg);
        const newUser = new User(
            {
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                password: passwordHasg
            }
        )

        await newUser.save();
        res.status(200).json(
            {
                message: "User created successfully"
            }
        )
    }catch(err){
        console.log(err.message),
        res.status(500).json(
            {
                message: "Error creating User"
            }
        )
    }
}


//Login User

export async function loginUser(req, res){
    try{
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({email: email})

        if(!user){  //if(user == null)
            res.status(404).json(
                {
                    message: "User not found"
                }
            )
            return;
        }else{

            const isPasswordCorrect = bcrypt.compareSync(password, user.password)
            if(isPasswordCorrect){

                const payload = {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    isAdmin: user.isAdmin,
                    isBlocked: user.isBlocked,
                    isEmailVerified: user.isEmailVerified,
                    image: user.image
                }

                const token = jwt.sign(payload, process.env.JWT_SECRET_KEY , {expiresIn: "1h"});
                res.status(200).json(
                    {
                        token: token,
                        user: payload,
                        isAdmin: user.isAdmin,
                        message: "User Logged successfully"
                    }
                )
            }else{
                res.status(401).json(
                    {
                        message: "Invalid Credentials"
                    }
                )
            }
        }
        
    }catch(err){
        console.log(err.message);
        res.status(500).json(
            {
                message: "Error Logging",
                
            }
        )
    }
}

//Update password
export async function updatePassword(req,res){
    if(req.user == null){
        res.status(401).json({
            message: "Unauthorized"
        })
    }
    try{
        const email = req.body.email;
        const newPassword = req.body.password;

        const user = await User.findOne({email: email});

        if(!user){
            res.status(404).json(
                {
                    message: "User not found.. Check the email..."
                }
            )
            return;
        }
        const newPassHash = bcrypt.hashSync(newPassword, 10);

        user.password = newPassHash;
        await user.save();

        res.status(200).json(
            {
                message: "Password Updated successfully"
            }
        )

    }catch(err){
        console.log(err.message);
        res.status(500).json(
            {
                message: "Error updating password"
            }
        )
    }
}

export async function getUserData(req, res){
    if(req.user == null){
        res.status(401).json({
            message: "Unauthorized"
        })
    }else{
        console.log(req.user)
        res.json({
            user: req.user,
            image: req.user.image
        })
    }
}


export async function updateUserData(req,res){
    if(req.user == null){
        res.status(401).json({
            message: "Unauthorized"
        })
    }else{
        try{
            await User.findOneAndUpdate(
                {email: req.user.email},
                {firstName: req.body.firstName, lastName: req.body.lastName, image: req.body.image}
            )
            const updatedUser = await User.findOne({email: req.user.email})
            const token = jwt.sign(
                {
                    email: updatedUser.email,
                    firstName: updatedUser.firstName,
                    lastName: updatedUser.lastName,
                    isAdmin: updatedUser.isAdmin,
                    isBlocked: updatedUser.isBlocked,
                    isEmailVerified: updatedUser.isEmailVerified,
                    image: updatedUser.image
                },
                process.env.JWT_SECRET_KEY,
                {expiresIn : "48h"}
            )
            res.json({
                message: "User data updated successfully",
                token: token
            })
        }catch(err){
            res.status(500).json({
                message: "Error updating user data"
            })
        }

    }
}


//Check if user is admin
export default function isAdmin(req){
    if(req.user == null){
        return false;
    }
    if(!req.user.isAdmin){
        return false;
    }
    return true;
}