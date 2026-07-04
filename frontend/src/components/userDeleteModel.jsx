import { MdDelete } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import api from "../utils/api";

export default function UserDeleteModel(props){

    const [showModel, setShowModel] = useState(false);
    const token = localStorage.getItem("token");
    const user = props.user;
    const email = props.user.email;
    const refresh = props.refresh;

    async function deleteUser(){
        if(token == null){
            toast.error("Unauthorize Access")
            return;
        }
        try{
        const response = await api.delete("/users/"+email, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        console.log("User Deleted Successfully")
        toast.success(response.data.message);
            
        }catch(error){
            toast.error(error.response.data.message);
            console.log(error);
        }
        
        
    }
    return(
        <>
        
        {/* pc view button */}
        <MdDelete className="hidden lg:flex text-red-500 hover:text-red-700"
        onClick={
            () => {
                setShowModel(true);
            }
        }
        />

        {/* Mobile view button */}
        <div className="lg:hidden flex justify-center bg-red-600 px-5 py-2 rounded-lg">
            <MdDelete className="text-white hover:text-red-700 cursor-pointer text-2xl"
        onClick={
            () => {
                setShowModel(true);
            }
        }
        />
        </div>
        



        {
            showModel && 
            <div className="w-screen h-screen fixed bg-black/50 top-0 left-0 flex justify-center items-center">
                {/* Black Box */}
                <div className="w-[350px] lg:w-[500px] h-[200px] bg-gray-900 rounded-2xl  flex flex-col ">
                    <h1 className="text-white text-left px-3 py-2 font-bold">Confirm Deletion </h1>
                   
                    {/* red box */}
                    <div className=" w-[350px] lg:w-[500px] h-[80px] bg-red-900/40 border-1 border-red-600 flex flex-col justify-center pl-3">
                        <h1 className="text-white">Are you sure you want to delete this User? </h1>
                    </div>

                    {/* button */}
                    <div className="w-full flex relative px-3 py-2">
                        <button
                            onClick={() => {
                                deleteUser();
                                setShowModel(false);
                                refresh();
                            }}
                            className="bg-red-600 text-white px-10 py-2 rounded-lg  absolute right-10 hover:bg-red-700 cursor-pointer"
                            >Delete</button>

                            <button
                                onClick={() => {
                                    setShowModel(false);
                                }}
                                className="bg-gray-600 text-white px-10 py-2 rounded-lg absolute left-10 hover:bg-gray-700 cursor-pointer"
                                >Cancel
                            </button>

                    </div>

                </div>
                
            </div>
        }
        </>
    )
}