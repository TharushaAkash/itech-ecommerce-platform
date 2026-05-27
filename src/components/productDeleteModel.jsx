import { MdDelete } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ProductDeleteModel(props){

    const [showModel, setShowModel] = useState(false);

    const product = props.product;
    const refresh = props.refresh;

    function handleDelete(){
          
                const token = localStorage.getItem("token");
                axios.delete(import.meta.env.VITE_API_URL+"/products/"+product.productId,{
                    headers: {
                        'Authorization': "Bearer " + token
                    }
                }).then(
                    (response) => {
                        toast.success("Product deleted successfully..");
                        refresh();
                    }
                ).catch(
                    (error) => {
                        toast.error("Error deleting product..");
                    }
                )
    }
    return(
        <>
        
        <MdDelete className="text-red-600 hover:text-red-700 cursor-pointer text-xl"
        onClick={
            () => {
                setShowModel(true);
            }
        }
        />

        {
            showModel && 
            <div className="w-screen h-screen fixed bg-black/50 top-0 left-0 flex justify-center items-center">
                {/* Black Box */}
                <div className="w-[500px] h-[200px] bg-gray-900 rounded-2xl  flex flex-col ">
                    <h1 className="text-white text-left px-3 py-2 font-bold">Confirm Deletion </h1>
                   
                    {/* red box */}
                    <div className="w-[500px] h-[80px] bg-red-900/40 border-1 border-red-600 flex flex-col justify-center">
                        <h1 className="text-white">Are you sure you want to delete this product? </h1>
                    </div>

                    {/* button */}
                    <div className="w-full flex relative px-3 py-2">
                        <button
                            onClick={() => {
                                handleDelete();
                                setShowModel(false);
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