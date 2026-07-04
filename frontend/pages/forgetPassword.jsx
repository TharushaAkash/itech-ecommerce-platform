import { useState } from "react";
import { FaLock } from "react-icons/fa";
import api from "../src/utils/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export default function ForgetPassword(){
    const [isEmailSend, setIsEmailSend] = useState(false);
    const [isOtpSend, setIsOtpSend] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    function sendEmail(){
        setIsOtpSend(true);
        api.post("/users/send-otp", {
            email: email
        }).then((response) => {
            console.log(response.data);
            toast.success("Email sent successfully");
            setIsOtpSend(false);
            setIsEmailSend(true);
        }).catch((error) => {
            console.log(error.response.data);
            toast.error("Failed to send email");
            setIsOtpSend(false);
        })
    }

    function verifyOtp(){
        const otpString = otp.join("");
        api.post("/users/verify-otp", {
            email: email,
            otp: otpString,
            newPassword: newPassword
        }).then((response) => {
            toast.success("Password changed successfully");
            navigate("/login");
        }).catch((error) => {
            toast.error("Failed to change password");
            console.log(error.response.data);
        })
    }

    return(
        <div className="w-full h-full flex items-center justify-center bg-primary py-10 px-10 lg:px-0">
            {
                !isEmailSend ? (
                    <div className="w-[500px] bg-white rounded-2xl shadow-2xl px-15 p-10"> 
                        {/* lock icon */}
                        <div className="flex justify-center items-center p-3">
                            <div className="flex justify-center items-center p-5 bg-blue-200 rounded-full">
                                <FaLock className="text-blue-600 text-3xl"/>
                            </div>
                        </div>
                        <h1 className="flex justify-center font-bold text-2xl mb-5">Forgot Password</h1>
                        <div className="w-full flex flex-col gap-2 ">
                            <label className="font-bold text-gray-700">Enter your Email: </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                className="bg-blue-100 border-2 border-gray-400 rounded-lg p-4 w-full mb-4 focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-600"
                            >
                            </input>
                            <div className="flex justify-center mb-10">
                                <button className="bg-blue-600 p-3 rounded-lg text-white hover:bg-blue-700 cursor-pointer"
                                onClick={sendEmail}
                                >
                                    {isOtpSend ? "Sending...." : "Send Reset Link"}
                                    
                                </button>
                            </div>

                        </div>
                        

                    </div>
                )
                :
                <div className="w-[500px] bg-white rounded-2xl shadow-2xl px-8 lg:px-15 p-5"> 
                    {/* lock icon */}
                    <div className="flex justify-center items-center p-3">
                        <div className="flex justify-center items-center p-5 bg-blue-200 rounded-full">
                            <FaLock className="text-blue-600 text-3xl"/>
                        </div>
                    </div>
                    <h1 className="flex justify-center font-bold text-2xl mb-5">Forgot Password</h1>

                    
                    <div className="w-full flex flex-col gap-2 ">
                            <label className="font-bold text-gray-700">New Password: </label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e)=>setNewPassword(e.target.value)}
                                className="bg-blue-100 border-2 border-gray-400 rounded-lg p-4 w-full mb-4 focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-600"
                            >
                            </input>

                            <label className="font-bold text-gray-700">Confirm Password: </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e)=>setConfirmPassword(e.target.value)}
                                className="bg-blue-100 border-2 border-gray-400 rounded-lg p-4 w-full mb-4 focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-600"
                            >
                            </input>
                            
                            <div className="border-t-2 border-gray-300">

                            </div>
                            <label className="font-bold text-gray-700 mt-2">Confirm Password: </label>

                            {/* otp input */}
                            <div className="flex justify-evenly mt-1 gap-2">
                                {otp.map((digit, index) => (
                                    <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => {
                                        const newOtp = [...otp];
                                        newOtp[index] = e.target.value;
                                        setOtp(newOtp);
                                    }}
                                    className="bg-blue-100 border-2 border-gray-400 rounded-lg w-12 h-12 text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-center mb-10">
                            <button className="bg-blue-600 p-3 rounded-lg text-white hover:bg-blue-700 cursor-pointer mt-5"
                                onClick={sendEmail}
                                >
                                {isOtpSend ? "Sending...." : "Send Reset Link"}
                                    
                            </button>
                        </div>
    
                </div>
            }
        </div>
    )
}