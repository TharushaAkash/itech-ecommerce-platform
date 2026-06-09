import { MdDelete } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import priceFormat from "../utils/priceFormat";

export default function OrderDataModel(props){

    const [showModel, setShowModel] = useState(false);

    const order = props.order;
    const refresh = props.refresh;

    
    return(
        <>
        
        <FaEye className="text-blue-500 hover:text-blue-700 cursor-pointer text-xl"
        onClick={
            () => {
                setShowModel(true);
            }
        }
        />

        {
            showModel && 
            <div className="w-screen h-screen fixed bg-black/50 top-0 left-0 flex justify-center items-center z-99">
                {/* Black Box */}
                <div className="w-[500px] bg-white rounded-2xl  flex flex-col relative items-center justify-center p-4">

                    <button className="absolute text-2xl top-2 right-2 text-red-600 hover:text-red-800 cursor-pointer"
                        onClick={()=>{setShowModel(false)}}
                    >
                        <IoCloseCircle />
                    </button>

                    <div className="w-full flex justify-between items-center">
                        <div className="flex flex-col gap-2">
                            <span className="text-sm text-gray-500">Order ID</span>
                            <span className="text-lg font-semibold text-gray-800">{order.orderId}</span>
                        </div>

                        <div className="flex flex-col gap-2">
                            <span className="text-sm text-gray-500">Customer Name</span>
                            <span className="text-lg font-semibold text-gray-800">{order.firstName} {order.lastName}</span>
                        </div>
                    </div>

                    <div className="w-full flex justify-between items-centermt-5">
                        <div className="flex flex-col gap-2">
                            <span className="text-sm text-gray-500">Email</span>
                            <span className="text-lg font-semibold text-gray-800">{order.email}</span>
                        </div>

                        <div className="flex flex-col gap-2">
                            <span className="text-sm text-gray-500">Phone</span>
                            <span className="text-lg font-semibold text-gray-800">{order.phone}</span>
                        </div>

                    </div>

                    <div className="w-full flex justify-between items-centermt-5">
                         <div className="flex flex-col gap-2">
                            <span className="text-sm text-gray-500">Address</span>
                            <span className="text-lg font-semibold text-gray-800">{order.addressLineOne} {order.addressLineTwo} {order.city} {order.state}</span>
                        </div>

                        <div className="flex flex-col gap-2">
                            <span className="text-sm text-gray-500">Total</span>
                            <span className="text-lg font-semibold text-gray-800">{priceFormat(order.total)}</span>
                        </div>
                    </div>

                </div>
                
            </div>
        }
        </>
    )
}