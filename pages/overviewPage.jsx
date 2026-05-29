import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import api from "../src/utils/api";
import LoadingAnimation from "../src/components/loadingAnimation";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { TbError404 } from "react-icons/tb";
import ImageSlideShow from "../src/components/imageSlideShow";
import priceFormat from "../src/utils/priceFormat";
import { FaCartShopping } from "react-icons/fa6";
import { BsLightningCharge } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { FaShieldAlt } from "react-icons/fa";
import { MdShoppingCartCheckout } from "react-icons/md";
import { GiReturnArrow } from "react-icons/gi";

export default function OverviewPage(){
    const parameters  = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [productLoading, setProductLoading] = useState(false);
    const [status, setStatus] = useState("loading")

    useEffect(
        () => {
            //Call Backend
            api.get("/products/"+parameters.productId).then(
                (response) => {
                    setProduct(response.data.product);
                    console.log(response.data.product);
                    setStatus("success");
                    console.log(status)
                }
            ).catch(
                (error) => {
                    setStatus("error");
                    toast.error(error?.response?.data?.message || "Error fetching product. Plz try again");
                    console.error("Error fetching product: ", error);
                }
            )
        },[]
    )

    return(
        <div className="w-full min-h-screen flex justify-center items-center bg-gray-100 p-5">
            {
                status === "loading" &&
                <LoadingAnimation />

            }

            {
                status === "error" &&
                <div className="w-full h-[300px] flex flex-col items-center justify-center">
                    <TbError404 className="text-9xl text-accent" />
                    <h1 className="text-2xl font-bold mb-4">
                        Failed to load product
                    </h1>
                    <Link to="/products" className="px-4 py-2 bg-accent text-white rounded">Back to Products</Link>
                </div>

            }

            {
                status == "success" && <div className="w-full">
                    {/* breadCumb */}
                    <div className="flex items-center gap-2 mb-5">
                        <Link to="/" className="hover:text-accent transition-colors duration-100">Home</Link>
                        <span>/</span>

                        <Link to="/products" className="hover:text-accent transition-colors duration-100">products</Link>
                        <span>/</span>
                        <span>{product.category}</span>
                        <span>/</span>
                        <span className="font-semibold">{product.name}</span>
                    </div>
                
                
                
                {/* // Main Container */}
                <div className="w-full h-full flex bg-white rounded-3xl shadow-lg p-6 gap-10">
                    {/* Left Side */}
                    <div className="w-1/2 h-full flex justify-center items-center bg-gray-50 rounded-2xl p-5 border">
                        <ImageSlideShow  images={product.images}/>
                    </div>


                    {/* Right Side */}
                    <div className="w-1/2 h-full flex flex-col p-5">
                        <h1 className="text-3xl font-bold">{product.name}</h1>
                        <span className="mb-4">
                            {product.altNames.map(
                                (name, index) => {
                                    return(
                                        <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600 mr-2">{name}</span>
                                    )
                                }
                            )}
                        </span>

                        <h2 className="text-sm text-gray-500 m">Product Code: {product.productId}</h2>
                        {/* Price section */}
                        <div className="w-full mt-5 flex flex-col">
                            <p className="text-4xl text-accent font-bold">
                            {
                                priceFormat(product.price)
                            }
                            </p>

                            {
                                product.labeledPrice > product.price && <div  className="flex gap-4 items-center">
                                <span className="text-xl text-gray-500 line-through">
                                    {priceFormat(product.labeledPrice)}
                                </span>
                                <span className="bg-green-100 text-green-700 font-semibold rounded-lg px-2 py-1">Save: {priceFormat(product.labeledPrice - product.price)}</span>
                                </div>
                            }
                        </div>

                        {/* Brand and Model */}
                        <div className="flex flex-wrap mt-8">
                            <div className="bg-gray-100 px-2 py-2 rounded-lg">
                                <span className="text-lg font-bold">Model:</span>
                                <span className="text-lg ml-2 text-gray-500 font-semibold">{product.model}</span>
                            </div>
                            <div className="bg-gray-100 px-2 py-2 rounded-lg ml-5">
                            <span className="text-lg font-bold ml-5">Category: </span>
                            <span className="text-lg text-gray-500 font-semibold">{product.category}</span>
                            </div>
                        </div>


                        {/* Discription */}
                        <p className="text-lg mt-8 text-gray-800 leading">{product.description}</p>

                        {/* Features */}
                        <div className="mt-8 grid grid-cols-2 gap-4 mb-5">
                            <div className="flex gap-3 items-start">
                                <TbTruckDelivery className="text-accent text-3xl"/>
                                <div>
                                    <h1 className="font-bold text-accent text-lg">Delivery</h1>
                                    <p className="text-gray-700">Fast island wide delivery</p>
                                </div>
                            </div>

                            <div className="flex gap-3 items-start">
                                <FaShieldAlt className="text-3xl text-accent" />
                                <div>
                                    <h1 className="font-bold text-lg text-accent">Warrenty</h1>
                                    <p className="text-gray-700">1 Year Official Warrenty</p>
                                </div>
                            </div>

                            <div className="flex gap-3 items-start">
                                <MdShoppingCartCheckout  className="text-accent text-3xl"/>
                                <div>
                                    <h1 className="font-bold text-accent text-lg">Secure Checkout</h1>
                                    <p className="text-gray-700">100% secure payment</p>
                                </div>
                            </div>

                            <div className="flex gap-3 items-start">
                                <GiReturnArrow className="text-accent text-3xl"/>
                                <div>
                                    <h1 className="font-bold text-accent text-lg">Returns</h1>
                                    <p className="text-gray-700">7 days easy returns</p>
                                </div>

                            </div>
                            
                            
                        </div>

                        {/* buttons */}
                        <div className="flex mt-9 gap-5">
                            <button className="flex justify-center items-center gap-5 w-62.5 h-13 bg-green-500 text-lg text-white font-semibold rounded-lg cursor-pointer hover:bg-green-700 transition-colors duration-300">
                                <FaCartShopping className="text-2xl" />
                                Add to Cart</button>
                            <button className=" flex justify-center items-center gap-4 w-62.5 h-13 bg-blue-500 text-lg text-white font-semibold rounded-lg cursor-pointer hover:bg-blue-700 transition-colors duration-300">
                                <BsLightningCharge className="text-2xl" />
                                Buy Now</button>
                        </div>
                    </div>

                </div>
                </div>
                

            }
            
        </div>
    )
}