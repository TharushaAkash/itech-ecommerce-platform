import axios from "axios";
import User from "../models/user.js";
import Otp from "../models/otp.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { response } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_APP_PASSWORD
    }
})

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
        console.log(err.message);
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
        console.log(user.isBlocked)

        if(!user){  //if(user == null)
            res.status(404).json(
                {
                    message: "User not found"
                }
            )
            return;
        }
        
        if(user.isBlocked){
            res.status(403).json(
                {
                    message: "User is blocked"
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
    console.log(req.user);
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


export async function userBlock(req,res){
    if(req.user == null){
        res.status(401).json({
            message: "Unauthorized"
        })
        return;
    }

    try{
        const email = req.body.email;
        const isBlocked = req.body.isBlocked;

        const user = await User.findOne({email: email});
        if(user == null){
            res.status(404).json({
                message: "User not found"
            })
            return;
        }

        const response = await User.findOneAndUpdate(
            {email: email},
            {isBlocked: isBlocked}
        )
        res.status(200).json({
            message: "User blocked successfully"
        })

    }catch(err){
        console.log(err.message);
        res.status(500).json({
            message: "Error blocking user"
        })
    }
}

export async function googleLogin(req, res){
    const accessToken = req.body.token;
    console.log(accessToken);

    //Google validation
    try{
        const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers : {
                Authorization: `Bearer ${accessToken}`
            
            }
        })
        console.log(response.data);
        const user = await User.findOne({email: response.data.email})

        if(user == null){
            //Create new account
            const newUser = new User({
                email: response.data.email,
                firstName: response.data.given_name,
                lastName: response.data.family_name,
                password: "google-login",
                isEmailVerified: true,
                image: response.data.picture
            })

            await newUser.save();

            const token = jwt.sign(
                {
                    email: newUser.email,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    isAdmin: false,
                    isBlocked: false,
                    isEmailVerified: newUser.isEmailVerified,
                    image: newUser.image
                },
                process.env.JWT_SECRET_KEY,
                {expiresIn : "48h"}
            )
            res.json({
                message: "User data Created successfully",
                token: token
            })

        }else{
            //Generate our token
             const token = jwt.sign(
                {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    isAdmin: user.isAdmin,
                    isBlocked: user.isBlocked,
                    isEmailVerified: user.isEmailVerified,
                    image: user.image
                },
                process.env.JWT_SECRET_KEY,
                {expiresIn : "48h"}
            )
            res.json({
                message: "User login successfully",
                token: token
            })
        }
    }catch(err){
        console.log(err.message);
    }
}

export async function sendOtp(req, res){
    const email = req.body.email;

    try{
        const user = await User.findOne({email: email});
        if(user == null){
            res.status(404).json({
                message: "User not found"
            })
            return;
        }
        await Otp.deleteOne({email: email});

        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        const newOtp = new Otp({
            email: email,
            otp: otpCode
        })

        await newOtp.save();

        //send email
        const message = {
            from: process.env.GMAIL,
            to: email,
            subject: "Password Reset OTP - I Computers",
            html: `<div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                        <h2>Your Verification Code</h2>
                        <p>Use the OTP below to verify your account:</p>
                        <div style="
                            font-size: 32px;
                            font-weight: bold;
                            letter-spacing: 5px;
                            background: #f4f4f4;
                            padding: 15px;
                            border-radius: 8px;
                            display: inline-block;
                            margin: 10px 0;
                        ">
                            ${otpCode}
                        </div>
                        <p>This code will expire in 10 minutes.</p>
                </div>
                `
        }
        
        await transporter.sendMail(message);
        res.status(200).json({
            message: "OTP sent successfully"
        })




    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

export async function verifyOtpAndPassword(req, res) {
    const email = req.body.email;
    const otp = req.body.otp;
    const password = req.body.password;

    try{
        const otpRecord = await Otp.findOne({email: email});
        if(otpRecord == null){
            res.status(404).json({
                message: "Invalid OTP"
            })
            return;
        }

        if(otpRecord.otp !== otp){
            res.status(400).json({
                message: "Invalid OTP"
            })
            return;
        }

        const otpAge = (Date.now() - otpRecord.createdTime.getTime()) / (1000 * 60)  //age in minutes
        if(otpAge > 10){
            await Otp.deleteOne({email: email});
            res.status(400).json({
                message: "OTP has expired"
            })
            return;
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        await User.findOneAndUpdate({email: email}, {password: hashedPassword});

        await Otp.deleteOne({email: email});
        res.status(200).json({
            message: "Password updated successfully"
        })

    }catch(err){
        res.status(500).json({
            message: err.message
        })

        
    }

}

//Get all users
export async function getAllUsers(req, res){
    try{
        if(req.user == null || !req.user.isAdmin){
            res.status(401).json(
                {
                    message: "Unauthorized User, Please login to create user"
                }
            )
            return;
        }

        const users = await User.find();
        res.status(200).json(
            {
                users: users
            }
        )
    }catch(err){
        res.status(500).json(
            {
                message: "Error getting users"
            }
        )
    }  
}

export async function deleteUser(req,res){

    const email = req.params.email;
    try{
        if(req.user == null || !req.user.isAdmin){
            res.status(401).json({
                message: "Unauthorized Access"
            })
            return;
        }

        const user = await User.findOne({email: email})
        if(user == null){
            res.status(404).json({
                message: "User not found"
            })
            return;
        }
        await User.deleteOne({email: email})
        console.log("User deleted successfully");
        res.status(200).json({
            message: "User deleted successfully"
        });
    }catch(err){
        console.log(err.message);
        res.status(500).json({
            message: "Error deleting user"
        });
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