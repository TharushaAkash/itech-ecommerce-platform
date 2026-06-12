import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import { FaHandPeace } from "react-icons/fa";
import api from "../src/utils/api";



export default function LoginPage(){

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const navigate =useNavigate();

    const googleLogin = useGoogleLogin(
        {
            onSuccess: (response) => {
                api.post("/users/google-login",{
                    token : response.access_token
                }).then((response)=>{
                    localStorage.setItem("token", response.data.token);
                    toast.success("Login Successfull")

                    if(response.data.isAdmin){
                        //Redirect to admin dashboard
                        //window.location.href = "/admin"; this method will cause a full page reload, we can use react router for better user experience
                        navigate("/admin");
                    }else{
                        //Redirect to home page
                        //window.location.href = "/";
                        navigate("/");
                    }

                }).catch(()=>{
                    toast.error("Google login failed")
                })
                console.log(response)
            },
            onError: (error)=>{
                toast.error("Google login failed")
            }
        }
    )

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

    return (
  <div className="min-h-screen flex bg-[url('/login-bg.jpg')] bg-cover bg-center">
    
    {/* Left Side */}
    <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="text-white text-center px-10">
        <h1 className="text-5xl flex font-bold mb-4">
          Welcome Back
          <span className="text-yellow-500 ml-5"><FaHandPeace /></span>
        </h1>
        
        <p className="text-lg text-gray-200">
          Sign in to continue shopping and manage your account.
        </p>
      </div>
    </div>

    {/* Right Side */}
    <div className="w-full lg:w-1/2 flex items-center justify-center p-5">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">

        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white">
            Sign In
          </h2>
          <p className="text-gray-300 mt-2">
            Enter your credentials to continue
          </p>
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="text-white text-sm mb-2 block">
            Email Address
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            className="w-full p-3 rounded-xl bg-white/20 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="text-white text-sm mb-2 block">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full p-3 rounded-xl bg-white/20 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end mb-6">
          <Link
            to="/forgot-password"
            className="text-sm text-blue-300 hover:text-blue-200"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-accent hover:opacity-90 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-[1.02]"
        >
          Sign In
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-white/20"></div>
          <span className="px-4 text-gray-300 text-sm">
            OR
          </span>
          <div className="flex-1 h-px bg-white/20"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={() => googleLogin()}
          className="w-full flex items-center justify-center gap-3 bg-white py-3 rounded-xl font-medium text-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
        >
          <FcGoogle className="text-2xl" />
          Continue with Google
        </button>

        {/* Register */}
        <p className="text-center mt-6 text-gray-300">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-300 hover:text-blue-200 font-semibold"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  </div>
);
}