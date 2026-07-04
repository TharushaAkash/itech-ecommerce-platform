import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import priceFormat from "../utils/priceFormat";
import { IoIosCall } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import api from "../utils/api";

export default function CustomerOrderDetailsModel(props) {

    const [showModel, setShowModel] = useState(false);

    const order = props.order;
    const [notes, setNotes] = useState(props.order.notes)
    

    return (
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
                <div className="w-screen h-screen fixed bg-black/50 top-0 left-0 flex justify-center items-center z-[99]">
                    {/* Black Box */}
                    <div className="w-[800px] bg-white rounded-2xl  flex flex-col relative items-center justify-center p-4 border-t-5 border-blue-600">

                        <button className="absolute text-2xl top-2 right-2 text-red-600 hover:text-red-800 cursor-pointer"
                            onClick={() => { setShowModel(false) }}
                        >
                            <IoCloseCircle />
                        </button>

                        <div className="w-full flex items-center">
                            <div className="flex flex-col gap-2">
                                <span className="text-md font-semibold text-green-600/70 bg-green-200 rounded-lg px-3 py-1">{order.orderId}</span>
                            </div>
                            {/* Email */}
                            <div className="flex justify-center items-center gap-2 ml-10 bg-green-200 rounded-lg px-3 py-1">
                                <span className="text-lg text-blue-600"><MdAlternateEmail /></span>
                                <span className="text-md font-semibold text-green-600/70 italic">{order.email}</span>
                                {/* <span className="text-lg font-semibold text-gray-800 ">{order.firstName} {order.lastName}</span> */}
                            </div>

                            {/* Phone Number */}
                            <div className="flex gap-2 justify-center items-center ml-10 bg-green-200 rounded-lg px-3 py-1">
                                <span className="text-lg text-blue-600"><IoIosCall /></span>
                                <span className="text-md font-semibold text-green-600/70 ">{order.phone}</span>
                            </div>
                        </div>


                        <div className="w-full flex justify-between items-center">
                            <div className="flex justify-center items-center gap-2 rounded-lg px-3 py-1 mt-3">
                                <span className="text-blue-600"><FaHome /></span>
                                <p className="text-md font-sans text-gray-800"><span className="font-bold">{order.firstName} {order.lastName}</span>, {order.addressLineOne}</p>
                            </div>
                        </div>
                        <div className="w-full flex justify-between items-center mb-5">
                            <div className="flex justify-center items-center gap-2 rounded-lg px-3 py-1">
                                <span>Order Date: {new Date(order.date).toLocaleDateString()}</span>
                                <span className={`ml-5 px-3 rounded-full text-white ${order.status === "Pending" ? "bg-yellow-400 text-white" : order.status === "Processing" ? "bg-blue-600" : order.status === "Shipped" ? "bg-green-500" : "bg-red-500"}`}>{order.status}</span>
                            </div>

                        </div>



                        <div className="w-full h-[250px] flex flex-col items-center  overflow-y-scroll p-2">
                            {
                                order.items.map(
                                    (item, index) => {
                                        return (
                                            <div key={index} className="w-full flex justify-between items-center bg-gray-100 rounded-lg mb-2 p-1">
                                                <div className="flex items-center gap-4">
                                                    <img className="w-[80px] h-[80px] object-cover rounded-lg" src={item.product.image}></img>
                                                    <div className="flex flex-col gap-1 items-start">
                                                        <span className="text-md font-bold">{item.product.name}</span>
                                                        <span className="text-gray-600 font-semibold">Quantity: {item.quantity}</span>
                                                        <span className="text-gray-600 font-semibold">Price: {priceFormat(item.product.labeledPrice)}</span>
                                                    </div>
                                                </div>
                                                <div className="font-semibold text-lg mr-10">
                                                    {priceFormat(item.product.labeledPrice * item.quantity)}
                                                </div>
                                            </div>
                                        )
                                    }
                                )
                            }

                        </div>
                        <div className="w-full bg-transparent sticky flex justify-end text-2xl font-bold text-green-600/70 p-1 rounded-lg">
                            <span className="bg-green-200 p-2 rounded-lg border-2 border-green-300">Total: {priceFormat(order.total)}</span>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}