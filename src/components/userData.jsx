import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../utils/api"
import { CiUser } from "react-icons/ci";

export default function UserData() {
    const [user, setUser] = useState(null)
    const navigate = useNavigate();

    useEffect(
        () => {
            const token = localStorage.getItem("token")
            if (token) {
                api.get("users/me", {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                })
                    .then(response => {
                        setUser(response.data)
                    }).catch(error => {
                        console.log(error)
                    })
            }
        }
        , [])
    return (
        <div>
            {
                user ? (
                    <div className="flex items-center justify-center h-full aspect-square lg:w-auto lg:aspect-auto relative rounded-lg">
                        <img src={user.image} referrerPolicy='no-referrer' alt="User" className="w-full h-full lg:w-[40px] lg:h-[40px] absolute lg:static rounded-full object-cover z-0" />

                        <select className="w-full h-full lg:w-auto lg:h-auto lg:ml-2 text-center absolute lg:static opacity-0 lg:opacity-100 lg:text-white bg-transparent cursor-pointer z-10 outline-none font-medium" onChange={(e) => {
                            if (e.target.value === "option2") {
                                navigate("/my-orders")
                            } else if (e.target.value === "option3") {
                                navigate("/settings")
                            } else if (e.target.value === "option4") {
                                localStorage.removeItem("token")
                                navigate("/login")
                            }else if (e.target.value === "option5") {
                                navigate("/admin");
                            }
                            e.target.value = "option1"
                        }}>
                            <option value="option1" className="bg-second text-white">{user.user.firstName}</option>
                            {!user.user.isAdmin && <option value="option2" className="bg-second text-white">My Orders</option>}
                            <option value="option3" className="bg-second text-white">Settings</option>
                            <option value="option4" className="bg-second text-white">Logout</option>
                            {user.user.isAdmin && <option value="option5" className="bg-second text-white">Admin-Home</option>}
                        </select>
                    </div>
                ) : (
                    <>
                        <Link to="/login" className="lg:text-white lg:text-lg lg:font-semibold lg:mr-4 h-full aspect-square flex justify-center items-center rounded-lg text-accent text-3xl font-bold shadow-2xl shadow-accent"><CiUser className="text-xl"/></Link>
                        {/* <Link to="/register" className=" hidden lg:block text-white text-lg font-semibold">Register</Link> */}
                    </>
                )}



        </div>
    )
}