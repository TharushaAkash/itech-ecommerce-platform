import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage(){

    const[email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const[password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate =useNavigate()

    async function handleRegister(){
        console.log("Email: ", email);
        console.log("Password: ", password);

        if(password != confirmPassword){
            toast.error("Password Not match")
            return;
        }

        //Backend running on localhost 3000/users/login
        try{
        const response = await axios.post(import.meta.env.VITE_API_URL +"/users/" , {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        })
        if(response){
            console.log(response.data);
            //alert(response.data.message);
            toast.success(response.data.message);
            navigate("/login")
        }
    } catch (error) {
        console.error("Error occurred while logging in:", error);
        //alert(error.response.data.message);
        toast.error(error.response.data.message);
    }
    }

    return(
        <div className="w-full h-screen flex justify-center items-center bg-[url('/login-bg.jpg')] bg-cover">
            <div className="w-0 lg:w-1/2 h-full">

            </div>

            <div className="w-screen lg:w-1/2 h-full flex justify-center items-center">
            {/* login box */}
            <div className="w-[90%] h-[500px] lg:w-[400px]  bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl flex flex-col justify-center items-center text-white">

                <h1 className="text-3xl font-bold mb-8 text-white">Sign UP</h1>

                <div className="w-3/4 flex gap-4">
                    <input onChange={(e) => {
                        setFirstName(e.target.value)
                        }}
                        value={firstName} 
                        type="text" 
                        placeholder="FirstName" 
                        className="w-3/4 mb-6 p-3 rounded-lg border border-second focus:outline-none focus:ring-2 focus:ring-accent"></input>

                    <input onChange={(e) => {
                    setLastName(e.target.value)
                    }}
                    value={lastName} 
                    type="text" 
                    placeholder="Last Name" 
                    className="w-3/4 mb-6 p-3 rounded-lg border border-second focus:outline-none focus:ring-2 focus:ring-accent"></input>


                </div>
                <input onChange={(e) => {
                    setEmail(e.target.value)
                }}
                 value={email} 
                type="email" 
                placeholder="Email" 
                className="w-3/4 mb-6 p-3 rounded-lg border border-second focus:outline-none focus:ring-2 focus:ring-accent"></input>

                <input onChange={(e) => {
                    setPassword(e.target.value)
                }}  
                value={password}
                type="password" 
                placeholder="password" 
                className="w-3/4 p-3 mb-6 rounded-lg border border-second focus:outline-none focus:ring-2 focus:ring-accent"></input>

                <input onChange={(e) => {
                    setConfirmPassword(e.target.value)
                }}  
                value={confirmPassword}
                type="password" 
                placeholder="Confirm Password" 
                className="w-3/4 p-3 mb-6 rounded-lg border border-second focus:outline-none focus:ring-2 focus:ring-accent"></input>


                {/* <p className="mt-4 mb-4 text-right w-3/4 text-gray-400">Forget Password? <Link to="/forgot-password" className="text-blue-800 hover:underline">Click here</Link></p> */}
                <button 
                onClick={handleRegister}
                className="w-2/4 bg-accent  p-3 rounded-2xl font-bold text-xl cursor-pointer hover:bg-second">Sign Up</button>
                <p className="mt-4 text-gray-400">Already have an account? <Link to="/login" className="text-blue-800 hover:underline">Login</Link></p>

            </div>

            </div>
        </div>
    )
}