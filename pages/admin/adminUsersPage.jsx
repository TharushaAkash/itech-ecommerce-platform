import { useEffect, useState } from "react"
import api from "../../src/utils/api";
import LoadingAnimation from "../../src/components/loadingAnimation";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { LuClipboardList } from "react-icons/lu";
import { ImBlocked } from "react-icons/im";
import { FaUser } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import UserDeleteModel from "../../src/components/userDeleteModel";

export default function AdminUsersPage(){

    const [users, setUsers] = useState([]);
    const [usersLoading, setUsersLoading] = useState(false);
    const token = localStorage.getItem("token");
    const [isBlocked, setIsBlocked] = useState(false);
    const navigate = useNavigate();


    async function handleBlock(email, targetBlockstatus){
        if(token == null){
            toast.error("Unauthorize Access")
            return;
        }
        api.put("/users/block",{
            email: email,
            isBlocked: targetBlockstatus
        },{ 
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(
            (response) => {
                console.log("User Blocked Successfully");
                setUsersLoading(false);
                toast.success(isBlocked ? "User Blocked Successfully" : "User Unblocked Successfully");
                
                console.log(isBlocked)
            }
        ).catch(
            (error) => {
                toast.error(error.response.data.message);
                console.log(error.message);
            }
        )

    }


    useEffect(
        ()=> {
            if(!usersLoading){
                api.get("/users",{
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }).then(
                    (response) => {
                        console.log(response.data.users);
                        setUsers(response.data.users);
                        setUsersLoading(true);
                    }
                ).catch(
                    (error) => {
                        console.log(error);
                }

                );
            }
        },[usersLoading]
    )

    return(
       <div className="w-full h-full bg-primary p-6 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg rounded-3xl px-8 py-6 flex items-center justify-between">

            <div>
                <h1 className="text-3xl font-bold text-accent">
                    Users
                </h1>

                <p className="text-gray-500 mt-1">
                    Manage all Users easily
                </p>
            </div>

            <div className="bg-second/10 text-second px-5 py-3 rounded-2xl font-semibold">
                {users.length} Users
            </div>

        </div>


        {/* Table Container */}
        <div className="hidden lg:flex mt-8 bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">

            <div className="overflow-x-auto w-full">

                {
                    usersLoading ? 
                    <table className="w-full">

                        {/* Table Header */}
                        <thead className="bg-accent text-white">

                            <tr className="text-sm uppercase tracking-wider">

                                <th className="p-5 px- text-left">Profile</th>
                                <th className="p-5 text-center">First Name</th>
                                <th className="p-5 text-center">Last Name</th>
                                <th className="p-5 text-center">Image</th>
                                <th className="p-5 text-center">Role</th>
                                <th className="p-5 text-center">status</th>
                                <th className="p-5 text-center">Verifiy</th>
                                <th className="p-5 text-center">Actions</th>

                            </tr>

                        </thead>

                        {/* Table Body */}
                        <tbody>

                            {
                                users.map((user,index)=>{
                                    return(
                                        <tr
                                            key={index}
                                            className="border-b border-gray-100 hover:bg-primary transition-all duration-200"
                                        >

                                            {/* user Info */}
                                            <td className="p-5">
                                                <div className="flex items-center gap-4">

                                                    <img
                                                        src={user.image}
                                                        alt={user.firstName}
                                                        className="w-16 h-16 object-cover rounded-2xl shadow-md border border-gray-200"
                                                    />
                                                </div>

                                            </td>

                                            {/* firstName */}
                                            <td className="text-center font-medium text-gray-700">
                                                {user.firstName}
                                            </td>

                                            {/* lastName */}
                                            <td className="text-center font-medium text-gray-700">
                                                {user.lastName}
                                            </td>

                                            {/* Price */}
                                            <td className="text-center font bold">
                                                {user.email}
                                            </td>

                                            {/* label Price */}
                                            <td className="text-center px-4 py-2 font bold">
                                                {user.isAdmin ? "Admin" : "User"}
                                            </td>

                                            {/* Availability */}
                                            <td className="text-center">

                                                <span
                                                    className={`px-4 py-2 rounded-full text-sm font-bold ${
                                                        user.isBlocked
                                                        ? 
                                                        "bg-red-100 text-red-500" 
                                                        :
                                                        "bg-green-100 text-green-600"
                                                    }`}
                                                >
                                                    {user.isBlocked
                                                        ? "Blocked"
                                                        : "Not Block"}
                                                </span>

                                            </td>

                                            {/* Category */}
                                            <td className="text-center">

                                                <span className="bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold">
                                                    {user.isEmailVerified ? "Verified" : "Not Verified"}
                                                </span>

                                            </td>

                    

                                            <td className="text-center text-red-600 hover:text-red-700 cursor-pointer text-xl">
                                                <span className="flex gap-4 justify-center ml-2 ">
                                                    <ImBlocked className="text-red-500 hover:text-red-700" onClick={()=>{
                                                        const targetBlockstatus = !user.isBlocked;
                                                        handleBlock(user.email, targetBlockstatus);
                                                        }}/>
                                                    <FaUser className="text-blue-500 hover:text-blue-700" />
                                                    <UserDeleteModel user={user} refresh={
                                                        ()=>{
                                                            setUsersLoading(false);
                                                        }
                                                    }/>


                                                </span>
                                            

                                            </td>

                                        </tr>

                                    )

                                })
                            }

                        </tbody>

                    </table>
                    : 
                    <LoadingAnimation />

                }
                    

            </div>

        </div>



        {/* Mobile View */}
                
        <div className="lg:hidden flex flex-col mt-8 gap-4">
            {
                usersLoading ?
                    <>
                        {
                            users.map((user, index)=>{
                                return(
                                    <div key={index} className="w-full bg-white rounded-lg shadow-lg flex flex-col px-5 py-2 overflow-x-auto">
                                        <div>
                                            <img src={user.image} alt={user.firstName} className="w-full rounded-xl  h-[300px] object-cover mb-2"/>
                                         </div>
                                                    
                                        <div className="flex flex-col gap-2">
                                            <div className="justify-between flex items-center">
                                                <h1 className="flex gap-2 items-center"><span className="text-blue-700 font-bold text-xl py-2 px-3"><FaUser /></span>{user.firstName}  -  {user.lastName}</h1>
                                                    
                                            </div>
                                            <h1 className="flex gap-2 items-center"><span className="text-blue-700 font-bold bg-gray-100 rounded-lg py-2 px-3">Email:</span>{user.email}</h1>
                                            <h1 className="flex gap-2 items-center"><span className="text-blue-700 font-bold bg-gray-100 rounded-lg py-2 px-3">Role:</span>{user.isAdmin ? "Admin" : "User"}</h1>
                                            <span className={` w-[100px] rounded-xl flex justify-center py-2 font-bold ${user.isBlocked ? "bg-red-500 border-2 border-red-700 text-accent" : "bg-green-100 text-green-600" }`}>{user.isBlocked ? "Blocked" : "Not Blocked"}</span>
                                            <h1 className="flex gap-2 items-center"><span className="text-blue-700 font-bold bg-gray-100 rounded-lg py-2 px-3">Veriification:</span>{user.isEmailVerified ? "Verified" : "Not Verified"}</h1>
                                            <div className="flex items-center justify-between w-full mb-3">
                                                <h1 className="text-blue-700 text-2xl font-bold">{}</h1>
                                            
                                            </div>
                                        </div>
                                        <div className="flex justify-center gap-5 mb-5">
                                            <button className="bg-green-500 px-5 rounded-lg py-2"><ImBlocked className="text-white font-bold text-2xl" onClick={()=>{
                                                const targetBlockstatus = !user.isBlocked;
                                                handleBlock(user.email, targetBlockstatus);
                                                }}/></button>
                                            <button className="bg-blue-500 px-5 rounded-lg py-2"><FaUser className="text-white font-bold text-2xl"></FaUser></button>
                                            <UserDeleteModel user={user} refresh={
                                                        ()=>{
                                                            setUsersLoading(false);
                                                        }
                                                    }/>
                                        </div>
                
                                    </div>
                                )
                            })
                        }
                    </>
                
                :
                <LoadingAnimation />
            }
                
        </div>


        


       </div>
    )
}