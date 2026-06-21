import { MdDelete } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import api from "../utils/api";

export default function ReviewDeleteModel(props){

    const [showModel, setShowModel] = useState(false);
    const token = localStorage.getItem("token");
    const refresh = props.refresh;
    const {orderId} = props;

    async function deleteReview(){
        try{
            if(token == null){
                navigate("/login");
                return;
            }

            const response = await api.delete("/feedback/"+orderId,{
                headers: {
                    "Authorization": "Bearer " + token
                }
            })

            toast.success(response.data.message)
        

        }catch(err){
            toast.error(err.message)
        }

    }
    return(
        <>
        
        {/* pc view button */}
        <button className="bg-red-600 w-full rounded-lg text-white font-semibold py-2 hover:bg-transparent hover:text-red-600 hover:border-2 hover:border-red-600 transition-colors duration-200 onCl" 
        onClick={()=>{setShowModel(true)}}
        >Delete</button>
        



        {
            showModel && 
            <div className="w-screen h-screen fixed bg-black/50 top-0 left-0 flex justify-center items-center">
                {/* Black Box */}
                <div className="w-[350px] lg:w-[500px] h-[200px] bg-gray-900 rounded-2xl  flex flex-col ">
                    <h1 className="text-white text-left px-3 py-2 font-bold">Confirm Deletion </h1>
                   
                    {/* red box */}
                    <div className=" w-[350px] lg:w-[500px] h-[80px] bg-red-900/40 border-1 border-red-600 flex flex-col justify-center pl-3">
                        <h1 className="text-white">Are you sure you want to delete this Review ? </h1>
                    </div>

                    {/* button */}
                    <div className="w-full flex relative px-3 py-2">
                        <button
                            onClick={() => {
                                deleteReview();
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