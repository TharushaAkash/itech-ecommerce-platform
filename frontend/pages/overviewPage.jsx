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
import { addToCart, getCart } from "../src/utils/cart";
import { FaStar } from "react-icons/fa6";

export default function OverviewPage(){
    const parameters  = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [productLoading, setProductLoading] = useState(false);
    const [status, setStatus] = useState("loading");
    const [reviews, setReviews] = useState([]);
    const [reviewsLoading, setReviewsLoading] = useState(true);

    useEffect(
        () => {
            //Call Backend
            api.get("/products/"+parameters.productId).then(
                (response) => {
                    setProduct(response.data.product);
                    setStatus("success");
                }
            ).catch(
                (error) => {
                    setStatus("error");
                    toast.error(error?.response?.data?.message || "Error fetching product. Plz try again");
                }
            )

            api.get("/feedback/product/"+parameters.productId).then(
                (response) => {
                    setReviews(response.data.feedBacks);
                    setReviewsLoading(false);
                }
            ).catch(
                (error) => {
                    setReviewsLoading(false);
                }
            )
        },[]
    )

    return(
        <div className="w-full lg:min-h-screen flex flex-col lg:flex-row justify-center items-center bg-gray-100  p-3 lg:p-5">
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
                    <div className="flex items-center gap-2 mb-5 ">
                        <Link to="/" className="hover:text-accent transition-colors duration-100">Home</Link>
                        <span>/</span>

                        <Link to="/products" className="hover:text-accent transition-colors duration-100">products</Link>
                        <span>/</span>
                        <span>{product.category}</span>
                        <span>/</span>
                        <span className="font-semibold">{product.name}</span>
                    </div>
                
                
                
                {/* // Main Container */}
                <div className="w-full mb-20 h-full flex flex-col lg:flex-row bg-white rounded-3xl shadow-lg p-6 gap-10">
                    {/* Left Side */}
                    <div className=" w-full lg:w-1/2 lg:h-full flex justify-center items-center bg-gray-50 rounded-2xl p-5 border">
                        <ImageSlideShow  images={product.images}/>
                    </div>


                    {/* Right Side */}
                    <div className="w-full lg:w-1/2 h-full flex flex-col lg:p-5">
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
                        <div className="flex flex-col lg:flex-row mt-8">
                            <div className="bg-gray-100 px-2 py-2 rounded-lg mb-3 lg:mb-0 lg:w-auto">
                                <span className="text-lg font-bold">Model:</span>
                                <span className="text-lg ml-2 text-gray-500 font-semibold">{product.model}</span>
                            </div>
                            <div className="bg-gray-100 px-2 py-2 rounded-lg lg:ml-3">
                            <span className="text-lg font-bold ">Category: </span>
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
                        <div className="flex mt-5 lg:mb-0 lg:mt-9 gap-5 sticky bottom-[80px] w-full lg:static lg:p-3">
                            <button
                                onClick={() => {addToCart(product, 1); toast.success("Added to cart")}} 
                                className="flex justify-center items-center gap-5 w-62.5 h-13 bg-green-500 text-lg text-white font-semibold rounded-lg cursor-pointer hover:bg-green-700 transition-colors duration-300">
                                <FaCartShopping className="text-2xl" />
                                Add to Cart</button>
                            <Link
                                to="/checkout"
                                state={
                                    [
                                        {
                                            product: {
                                                productId: product.productId,
                                                name: product.name,
                                                image: product.images[0],
                                                labeledPrice: product.labeledPrice,
                                                price: product.price,
                                            },
                                            quantity: 1
                                        }
                                    ]
                                }
                                className=" flex justify-center items-center gap-4 w-62.5 h-13 bg-blue-500 text-lg text-white font-semibold rounded-lg cursor-pointer hover:bg-blue-700 transition-colors duration-300">
                                <BsLightningCharge className="text-2xl" />
                                Buy Now</Link>
                        </div>
                    </div>

                </div>

                <div className="w-full mb-20">
                    <h2 className="text-2xl font-bold mb-5">Product Reviews</h2>
                    {
                        reviewsLoading ? <LoadingAnimation /> :
                        reviews.length > 0 ? (
                            <div className="flex gap-4 w-full h-[250px] overflow-x-auto scrollbar-hide scroll-smooth">
                                {
                                    reviews.map((review, index) => {
                                        return(
                                            <div key={index} className="h-full min-w-[300px] bg-white rounded-xl p-3 shadow-md">
                                                <div className="flex items-center justify-evenly">
                                                    <div className="m-2 flex gap-3">
                                                        <img  className="w-[30px] h-[30px] rounded-full object-cover" src={review.image}/>
                                                        <div className="flex flex-col">
                                                            <h3 className="font-bold text-sm">{review.name}</h3>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center">
                                                        {[1, 2, 3, 4, 5].map((star)=>{
                                                            return(
                                                                <FaStar
                                                                    key={star}
                                                                    size={10}
                                                                    className={star <= review.rating ? "text-yellow-400" : "text-gray-300"}
                                                                />
                                                            )
                                                        })}
                                                        <p className="ml-2 text-sm">{review.rating}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-2 mt-3">
                                                    <h2 className="text-black font-semibold text-md">{review.subject}</h2>
                                                    <p className="text-gray-600 font-semibold">{review.message.length > 50 ? review.message.substring(0, 50) + "..." : review.message}</p>
                                                </div>
                                                {
                                                    review.pictures && review.pictures.length > 0 && (
                                                        <div className="flex overflow-x-auto gap-3 mt-5">
                                                            {
                                                                review.pictures.map((img, idx) => {
                                                                    return(
                                                                        <img key={idx} className="w-[80px] h-[80px] rounded-lg object-cover border border-gray-200" src={img} alt="Review" />
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        ) : (
                            <p className="text-gray-500 font-semibold">No reviews yet for this product.</p>
                        )
                    }
                </div>

                </div>
                

            }
            
        </div>
    )
}