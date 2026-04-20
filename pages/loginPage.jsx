import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage(){

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const navigate =useNavigate()

    async function handleLogin(){
        console.log("Email: ", email);
        console.log("Password: ", password);

        //Backend running on localhost 3000/users/login
        try{
        const response = await axios.post(import.meta.env.VITE_API_URL +"/users/login" , {
            email: email,
            password: password
        })
        if(response){
            console.log(response.data);
            console.log("Wellcome back! ", response.data.user.firstName);
            localStorage.setItem("token", response.data.token);
            //alert(response.data.message);
            toast.success(response.data.message);

            if(response.data.isAdmin){
                //Redirect to admin dashboard
                //window.location.href = "/admin"; this method will cause a full page reload, we can use react router for better user experience
                navigate("/admin");
            }else{
                //Redirect to home page
                //window.location.href = "/";
                navigate("/");
            }
        }
    } catch (error) {
        console.error("Error occurred while logging in:", error);
        //alert(error.response.data.message);
        toast.error(error.response.data.message);
    }
    }

    return(
        <div className="w-full h-screen flex justify-center items-center bg-[url('/login-bg.jpg')] bg-cover">
            <div className="w-1/2 h-full">

            </div>

            <div className="w-1/2 h-full flex justify-center items-center">
            {/* login box */}
            <div className="w-[400px] h-[500px] backdrop-blur-lg rounded-xl shadow-2xl flex flex-col justify-center items-center text-white">

                <h1 className="text-3xl font-bold mb-8 text-white">Sign In</h1>
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
                className="w-3/4 p-3 rounded-lg border border-second focus:outline-none focus:ring-2 focus:ring-accent"></input>

                <p className="mt-4 mb-4 text-right w-3/4 text-gray-400">Forget Password? <Link to="/forgot-password" className="text-blue-800 hover:underline">Click here</Link></p>
                <button 
                onClick={handleLogin}
                className="w-2/4 bg-accent  p-3 rounded-2xl font-bold text-xl cursor-pointer hover:bg-second">Sign In</button>
                <p className="mt-4 text-gray-400">Already have an account? <Link to="/register" className="text-blue-800 hover:underline">Register</Link></p>

            </div>

            </div>
        </div>
    )
}