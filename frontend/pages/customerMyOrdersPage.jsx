import { Link, Links } from "react-router-dom";
import { FaPhone, FaPlus, FaRegUser } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { MdDelete, MdEmail } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-hot-toast";
import LoadingAnimation from "../src/components/loadingAnimation";
import ProductDeleteModel from "../src/components/productDeleteModel";
import { useNavigate } from "react-router-dom";
import priceFormat from "../src/utils/priceFormat";
import OrderDataModel from "../src/components/orderDataModel";
import CustomerOrderDetailsModel from "../src/components/customerOrderDetailsModal";
import { SlCalender } from "react-icons/sl";
import { LuClipboardList } from "react-icons/lu";
import CustomerFeedbackModal from "../src/components/customerFeedBackModal";

export default function CustomerOrdersPage(){

    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(false);
    const navigate = useNavigate();
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    //call Backend API when loading the page
    const token = localStorage.getItem("token");

    useEffect(
        () => {
            if(!ordersLoading){
                axios.get(import.meta.env.VITE_API_URL+"/orders/"+pageSize+"/"+currentPage, {
                headers: {
                    "Authorization": "Bearer " + token
            }
            }).then(
                (response) => {
                    setOrders(response.data.orders);
                    setTotalPages(response.data.totalPages)
                    setOrdersLoading(true);
                }
            ).catch(
                (error) => {
                    console.error("Error fetching Orders: ", error);
                }
            )

            }
            
        },[ordersLoading])

    


    return(
    <div className="w-full h-full bg-primary p-6 overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg rounded-3xl px-8 py-6 flex items-center justify-between">

            <div>
                <h1 className="text-3xl font-bold text-accent">
                    Orders
                </h1>

                <p className="text-gray-500 mt-1">
                    All orders
                </p>
            </div>

            <div className="bg-second/10 text-second px-5 py-3 rounded-2xl font-semibold">
                {orders.length} Orders
            </div>

        </div>





        {/* Table Container */}
        <div className=" hidden lg:block mt-8 bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden w-full">

            <div className="overflow-x-auto w-full">


                {
                    ordersLoading ? 
                
                <table className="w-full">

                    {/* Table Header */}
                    <thead className="bg-accent text-white">

                        <tr className="text-sm uppercase tracking-wider">

                            <th className="p-5 text-center">Order ID</th>
                            <th className="p-5 text-center">First Name</th>
                            <th className="p-5 text-center">Last Name</th>
                            <th className="p-5 text-center">Email</th>
                            <th className="p-5 text-center">Phone</th>
                            <th className="p-5 text-center">Date</th>
                            <th className="p-5 text-center">Total</th>
                            <th className="p-5 text-center">Status</th>
                            <th className="p-5 text-center">Actions</th>

                        </tr>

                    </thead>

                    {/* Table Body */}
                    <tbody>

                        {
                            orders.map((order,index)=>{
                                return(
                                    <tr
                                        key={index}
                                        className="border-b border-gray-100 hover:bg-primary transition-all duration-200"
                                    >

                                        {/* Order Info */}
                        
                                        {/* Order ID */}
                                        <td className="text-center font-bold text-gray-700">
                                            #{order.orderId}
                                        </td>

                                        {/* First Name */}
                                        <td className="text-center px-4 py-2 font-semibold text-gray-700">
                                            {order.firstName}
                                        </td>

                                        {/* Last Name */}
                                        <td className="text-center px-4 py-2 font-semibold text-gray-700">
                                            {order.lastName}
                                        </td>

                                        {/* Email Name */}
                                        <td className="text-center py-5">
                                            <span className="bg-second/10 text-second px-4 py-2 rounded-full text-sm font-semibold">
                                                {order.email}
                                            </span>
                                        </td>

                                        {/* phone*/}
                                        <td className="text-center font-semibold text-gray-700">
                                            {order.phone}
                                        </td>

                                        {/* Date */}
                                        <td className="text-center font-semibold text-gray-700">
                                            {new Date(order.date).toLocaleDateString()}

                                        </td>

                                        {/* Total */}
                                        <td className="text-center font-bold text-blue-700">
                                            <span className="bg-blue-200/70 px-4 py-2 rounded-full">
                                                {priceFormat(order.total)}
                                            </span>
                                        </td>

                                        <td className="text-center font-bold text-gray-700">
                                            <span className={`${order.status === "Pending" ? "bg-yellow-200 border border-yellow-700 text-yellow-700" : order.status === "Processing" ? "bg-yellow-400 border border-yellow-800 text-yellow-800" : order.status === "Shipped" ? "bg-green-200 border border-green-700 text-green-700" : order.status === "Delivered" ? "bg-blue-300 border border-blue-700 text-blue-700": "bg-red-200 border border-red-700 text-red-700"} px-4 py-2 rounded-full`}>
                                                {order.status}
                                            </span>
                                            
                                        </td>

                                        <td className="text-center px-5 py-2 flex gap-4 items-center">
                                            <CustomerOrderDetailsModel order={order}/>
                                            <CustomerFeedbackModal order={order} refresh={()=>setOrdersLoading(false)}/>
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
                        ordersLoading ?
                        <>
                            {
                                orders.map((order, index)=>{
                                    return(
                                        <div key={index} className="w-full bg-white rounded-lg shadow-lg flex flex-col px-5 py-2">
                                            
                                            <div className="flex flex-col gap-2">
                                                <div className="justify-between flex items-center">
                                                    <h1 className="flex gap-2 items-center"><span className="text-blue-700 font-bold text-xl p-2"><LuClipboardList /></span>#{order.orderId}</h1>
                                                    <h1 className={`${order.status=== "Pending" ? "bg-yellow-200 border border-yellow-700 text-yellow-700" : order.status === "Processing" ? "bg-yellow-400 border border-yellow-800 text-yellow-800" : order.status === "Shipped" ? "bg-green-200 border border-green-700 text-green-70" : order.status === "Delivered" ? "bg-blue-300 border border-blue-700 text-blue-700" : "bg-red-200 border border-red-700 text-red-700"} px-4 py-2 rounded-full`}>{order.status}</h1>
                                                </div>
                                                <h1 className="flex gap-2"><span className="text-blue-700 font-bold bg-gray-200 rounded-full p-2"><FaRegUser /></span>{order.firstName} {order.lastName}</h1>
                                                <h1 className="flex gap-2"><span className="text-blue-700 font-bold bg-gray-200 rounded-full p-2"><MdEmail /></span>{order.email}</h1>
                                                <h1 className="flex gap-2"><span className="text-blue-700 font-bold bg-gray-200 rounded-full p-2"><FaPhone /></span>{order.phone}</h1>
                                                <h1 className="flex gap-2"><span className="text-blue-700 font-bold bg-gray-200 rounded-full p-2"><SlCalender /></span>{new Date(order.date).toLocaleDateString()}</h1>
                                                <div className="flex items-center justify-between w-full mb-3">
                                                    <h1 className="text-blue-700 text-2xl font-bold">{priceFormat(order.total)}</h1>
                                                    <CustomerOrderDetailsModel order={order} refresh={()=>setOrdersLoading(false)}/>
                                                    <CustomerFeedbackModal order={order} refresh={()=>setOrdersLoading(false)}/>
                                                </div>
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
        
                
        <div className="w-full flex justify-end items-center gap-3 mt-8 mb-30">
                    <button className="px-3 py-1 bg-gray-400 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 cursor-pointer"
                        onClick={
                            () => {
                                if(currentPage > 1){
                                    setCurrentPage(currentPage - 1);
                                    setOrdersLoading(false);
                                }
                            }
                        }
                    >
                        Previous
                    </button>

                    <span className="text-sm font-semibold text-gray-600">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        className="px-3 py-1 bg-gray-400 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 cursor-pointer"
                        onClick={
                            () => {
                                setCurrentPage(currentPage + 1);
                                setOrdersLoading(false)
                            }
                        }
                    >
                        Next

                    </button>
                    <select 
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(parseInt(e.target.value));
                            setOrdersLoading(false);
                        }}

                        className="ml-4 px-3 py-1 bg-gray-400 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                    >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>

                    </select>

                </div>

    </div>
)
}