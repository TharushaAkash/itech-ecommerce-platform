import { MdDelete } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import priceFormat from "../utils/priceFormat";
import { IoIosCall } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import api from "../utils/api";

export default function OrderDataModel(props) {

    const [showModel, setShowModel] = useState(false);

    const order = props.order;
    const refresh = props.refresh;
    const [notes, setNotes] = useState(props.order.notes)
    const [status, setStatus] = useState(props.order.status)
    const [isUpdating, setIsUpdating] = useState(false)

    async function updateOrder() {
        setIsUpdating(true)
        const token = localStorage.getItem("token");
        try {
            const response = await api.put("/orders/" + order.orderId, {
                notes: notes,
                status: status
            }, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            }
            )
            setIsUpdating(false)
            toast.success("Order updated successfully")
            refresh();

        } catch (err) {
            setIsUpdating(false)
            console.log(err.message)
            toast.error("response.data.message")

        }
    }


    return (
        <>
            {/* desktop icon */}
            <FaEye className="hidden lg:flex text-blue-500 hover:text-blue-700 cursor-pointer text-xl"
                onClick={
                    () => {
                        setShowModel(true);
                    }
                }
            />

            {/* Mobile view */}
            <button className="lg:hidden px-10 py-2 bg-blue-600 rounded-lg text-white text-xl font-bold" onClick={()=>{setShowModel(true)}}>View</button>

            {
                showModel &&
                <div className="w-screen h-screen fixed bg-black/50 top-0 left-0 flex justify-center items-center z-[99]">
                    {/* Black Box */}
                    <div className="w-[400px] md:w-[600px] lg:w-[800px] bg-white rounded-2xl  flex flex-col relative items-center justify-center p-4 border-t-5 border-blue-600">

                        <button className="absolute text-2xl top-2 right-2 text-red-600 hover:text-red-800 cursor-pointer"
                            onClick={() => { setShowModel(false) }}
                        >
                            <IoCloseCircle />
                        </button>

                        <div className="w-full flex lg:flex-nowrap md:flex-nowrap items-center  lg:mt-0">
                            <div className="flex  gap-5">
                                <span className="text-md font-semibold text-green-600/70 bg-green-200 rounded-lg px-3 py-1">{order.orderId}</span>
                                <div className="lg:hidden flex items-center gap-2 bg-green-200 rounded-lg px-3 py-1">
                                    <span className="text-lg text-blue-600"><IoIosCall /></span>
                                    <span className="text-md font-semibold text-green-600/70 ">{order.phone}</span>
                                </div>
                            </div>

                            {/* Mobiel-view-Phone Number
                            <div className="lg:hidden w-full flex items-center mt-3 justify-center">
                                <div className="flex items-center gap-2 bg-green-200 rounded-lg px-3 py-1">
                                    <span className="text-lg text-blue-600"><IoIosCall /></span>
                                    <span className="text-md font-semibold text-green-600/70 ">{order.phone}</span>
                                </div>
                            </div> */}

                            {/* PC-view-Email */}
                            <div className="hidden lg:flex justify-center items-center gap-2 ml-5 lg:ml-10 bg-green-200 rounded-lg px-3 py-1">
                                <span className="text-lg text-blue-600"><MdAlternateEmail /></span>
                                <span className="text-md font-semibold text-green-600/70 italic">{order.email}</span>
                                {/* <span className="text-lg font-semibold text-gray-800 ">{order.firstName} {order.lastName}</span> */}
                            </div>

                            {/* PC-view-phone Number */}
                            <div className="hidden lg:flex gap-2 justify-center items-center ml-10 bg-green-200 rounded-lg px-3 py-1">
                                <span className="text-lg text-blue-600"><IoIosCall /></span>
                                <span className="text-md font-semibold text-green-600/70 ">{order.phone}</span>
                            </div>
                        </div>



                        {/* Mobiel-view-email */}
                        <div className="lg:hidden w-full flex flex-nowrap md:flex-nowrap items-center mt-3">
                            <div className="lg:hidden flex justify-center items-center gap-2 bg-green-200 rounded-lg px-3 py-1">
                                <span className="text-lg text-blue-600"><MdAlternateEmail /></span>
                                <span className="text-md font-semibold text-green-600/70 italic">{order.email}</span>
                                {/* <span className="text-lg font-semibold text-gray-800 ">{order.firstName} {order.lastName}</span> */}
                            </div>
                        </div>
                        


                        <div className="w-full flex justify-between items-center ">
                            <div className="flex justify-center items-center gap-5 lg:gap-2 rounded-lg px-3 py-1 mt-3">
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


                        <div className="w-full flex gap-5 items-center mt-2 pb-2 justify-between">
                            <div className="w-1/2 flex flex-col justify-start">
                                <label className="text-gray-800 font-semibold mb-1 text-left">Edit Notes:</label>
                                <textarea type="text" placeholder="Enter notes here..." value={notes} className="px-3 py-1 w-full bg-gray-200 text-gray-700 rounded-lg" onChange={(e) => setNotes(e.target.value)}></textarea>
                            </div>

                            <div className="flex flex-col">
                                <label className="text-gray-800 font-semibold mb-1">Uptate Status:</label>
                                <select value={status} className="px-3 py-1 bg-gray-200 text-gray-700 rounded" onChange={(e) => setStatus(e.target.value)}>
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>
                            <button
                                onClick={updateOrder}
                                disabled={isUpdating}
                                className="hidden lg:flex mt-4 text-lg bg-blue-600 rounded-lg px-8 py-2 font-semibold text-white hover:bg-blue-700 transition-colors duration-200 cursor-pointer">{isUpdating ? "Wait" : "Update"}</button>
                        </div>
                        <button
                                onClick={updateOrder}
                                disabled={isUpdating}
                                className="lg:hidden mt-4 mb-4 text-lg bg-blue-600 rounded-lg px-15 py-2 font-semibold text-white hover:bg-blue-700 transition-colors duration-200 cursor-pointer">{isUpdating ? "Wait" : "Update"}</button>


                    </div>


                </div>
            }
        </>
    )
}