import { Link, Links } from "react-router-dom";
import { FaPhone, FaPlus, FaRegUser } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { MdDelete, MdEmail } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-hot-toast";
import LoadingAnimation from "../../src/components/loadingAnimation";
import ProductDeleteModel from "../../src/components/productDeleteModel";
import { useNavigate } from "react-router-dom";
import { LuClipboardList } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";

export default function ProductPage(){

    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(false);
    const navigate = useNavigate();


    //call Backend API when loading the page
    const token = localStorage.getItem("token");

    useEffect(
        () => {
            if(!productsLoading){
                axios.get(import.meta.env.VITE_API_URL+"/products", {
                headers: {
                    "Authorization": "Bearer " + token
            }
            }).then(
                (response) => {
                    setProducts(response.data.products);
                    setProductsLoading(true);
                }
            ).catch(
                (error) => {
                    console.error("Error fetching products: ", error);
                }
            )

            }
            
        },[productsLoading])

    


    return(
    <div className="w-full h-full bg-primary p-6 overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg rounded-3xl px-8 py-6 flex items-center justify-between">

            <div>
                <h1 className="text-3xl font-bold text-accent">
                    Products
                </h1>

                <p className="text-gray-500 mt-1">
                    Manage all your products easily
                </p>
            </div>

            <div className="bg-second/10 text-second px-5 py-3 rounded-2xl font-semibold">
                {products.length} Products
            </div>

        </div>





        {/* Table Container */}
        <div className="hidden lg:flex mt-8 bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">

            <div className="overflow-x-auto">


                {
                    productsLoading ? 
                <table className="w-full">

                    {/* Table Header */}
                    <thead className="bg-accent text-white">

                        <tr className="text-sm uppercase tracking-wider">

                            <th className="p-5 text-left">Product</th>
                            <th className="p-5 text-center">ID</th>
                            <th className="p-5 text-center">Price</th>
                            <th className="p-5 text-center">Label price</th>
                            <th className="p-5 text-center">Brand</th>
                            <th className="p-5 text-center">Category</th>
                            <th className="p-5 text-center">Availability</th>
                            <th className="p-5 text-center">Stock</th>
                            <th className="p-5 text-center">Actions</th>

                        </tr>

                    </thead>

                    {/* Table Body */}
                    <tbody>

                        {
                            products.map((product,index)=>{
                                return(
                                    <tr
                                        key={index}
                                        className="border-b border-gray-100 hover:bg-primary transition-all duration-200"
                                    >

                                        {/* Product Info */}
                                        <td className="p-5">
                                            <div className="flex items-center gap-4">

                                                <img
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    className="w-16 h-16 object-cover rounded-2xl shadow-md border border-gray-200"
                                                />

                                                <div>

                                                    <h1 className="font-bold text-gray-800">
                                                        {product.name}
                                                    </h1>

                                                    <p className="text-sm text-gray-500">
                                                        {product.model}
                                                    </p>

                                                </div>

                                            </div>

                                        </td>

                                        {/* Product ID */}
                                        <td className="text-center font-medium text-gray-700">
                                            {product.productId}
                                        </td>

                                        {/* Price */}
                                        <td className="text-center px-4 py-2 font bold">

                                            Rs. {product.price.toLocaleString()}
                                        </td>

                                        {/* label Price */}
                                        <td className="text-center px-4 py-2 font bold">
                                            Rs. {product.labeledPrice.toLocaleString()}
                                        </td>

                                        {/* Brand */}
                                        <td className="text-center">
                                            <span className="bg-second/10 text-second px-4 py-2 rounded-full text-sm font-semibold">
                                                {product.brand}
                                            </span>
                                        </td>

                                        {/* Category */}
                                        <td className="text-center">

                                            <span className="bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold">
                                                {product.category}
                                            </span>

                                        </td>

                                        {/* Availability */}
                                        <td className="text-center">

                                            <span
                                                className={`px-4 py-2 rounded-full text-sm font-bold ${
                                                    product.isAvailable
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-red-100 text-red-500"
                                                }`}
                                            >
                                                {product.isAvailable
                                                    ? "Available"
                                                    : "Out of Stock"}
                                            </span>

                                        </td>

                                        {/* Stock */}
                                        <td className="text-center font-bold text-gray-700">
                                            {product.stock}
                                        </td>

                                        <td className="text-center text-red-600 hover:text-red-700 cursor-pointer text-xl">
                                            <span className="flex gap-4 justify-center">
                                                <ProductDeleteModel product={product} refresh={
                                                    () => {
                                                        setProductsLoading(false);
                                                    }
                                                }/>
                                                
                                                <Link to="/admin/edit-product" state={product}>
                                                <FaEdit className="text-blue-500 hover:text-blue-700"/>
                                                </Link>
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
                        productsLoading ?
                        <>
                            {
                                products.map((product, index)=>{
                                    return(
                                        <div key={index} className="w-full bg-white rounded-lg shadow-lg flex flex-col px-5 py-2">
                                            <div>
                                                <img src={product.images[0]} alt={product.name} className="w-full rounded-xl object-cover"/>
                                            </div>
                                            
                                            <div className="flex flex-col gap-2">
                                                <div className="justify-between flex items-center">
                                                    <h1 className="flex gap-2 items-center"><span className="text-blue-700 font-bold text-xl py-2 px-3"><LuClipboardList /></span>{product.productId}  -  {product.brand}</h1>
                                                    {/* <h1 className={`${product.isAvailable ? "bg-yellow-200 border : bg-accent text-accent" : "bg-red-200 border border-red-700 text-red-700"} px-4 py-2 rounded-full`}>{product.isAvailable ? "Available" : "Out of Stock"}</h1> */}
                                                </div>
                                                <h1 className="flex gap-2 items-center"><span className="text-blue-700 font-bold bg-gray-200 rounded-lg py-2 px-3">Category:</span>{product.category}</h1>
                                                <h1 className="flex gap-2 items-center"><span className="text-blue-700 font-bold bg-gray-200 rounded-lg py-2 px-3">Model:</span>{product.model}</h1>
                                                <span className={` w-[100px] rounded-2xl flex justify-center py-2 font-bold ${product.isAvailable ? "bg-green-200 border-2 border-green-500 text-accent" : "bg-red-500 text-white border-2 border-red-500" }`}>{product.isAvailable ? "Available" : "Out of Stock"}</span>
                                                <h1 className="flex gap-2 items-center"><span className="text-blue-700 font-bold bg-gray-200 rounded-lg py-2 px-3">Stock</span>{product.stock}</h1>
                                                <div className="flex items-center justify-between w-full mb-3">
                                                    <h1 className="text-blue-700 text-2xl font-bold">{}</h1>
                                    
                                                </div>
                                            </div>
                                            <div className="flex justify-center gap-5 mb-5">
                                                <ProductDeleteModel product={product} refresh={
                                                    () => {
                                                        setProductsLoading(false);
                                                    }
                                                }/>
                                                <Link to="/admin/edit-product" state={product}>
                                                <button className="bg-blue-500 px-10 rounded-lg py-2"><FaEdit className="text-white font-bold text-2xl"/></button>
                                                </Link>

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

        {/* Floating Add Button */}
        <Link
            to="/admin/add-products"
            className="fixed bottom-8 right-8 w-[70px] h-[70px] rounded-3xl bg-second text-white flex justify-center items-center text-2xl shadow-2xl hover:scale-110 hover:bg-accent transition-all duration-300"
        >
            <FaPlus />
        </Link>

    </div>
)
}