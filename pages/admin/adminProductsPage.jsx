import { Link, Links } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-hot-toast";
import LoadingAnimation from "../../src/components/loadingAnimation";
import ProductDeleteModel from "../../src/components/productDeleteModel";
import { useNavigate } from "react-router-dom";

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
        <div className="mt-8 bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">

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