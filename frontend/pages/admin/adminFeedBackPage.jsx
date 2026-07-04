import { useEffect, useState } from "react"
import api from "../../src/utils/api";
import LoadingAnimation from "../../src/components/loadingAnimation";
import { FaStar } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ReviewDeleteModel from "../../src/components/reviewDeleteModel";

export default function AdminFeedBackPage(){
    const [reviews, setReviews] = useState([]);
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const token = localStorage.getItem("token");
    const [modelOpen, setModelOpen] = useState(false);
    const [selectedImg, setSelectedImg] = useState(null);
    const navigate = useNavigate();


    useEffect(
        () => {
            if(!reviewsLoading){
                api.get("/feedback", {
                headers: {
                    "Authorization": "Bearer " + token
            }
            }).then(
                (response) => {
                    setReviews(response.data.feedBacks);
                    setReviewsLoading(true);
                }
            ).catch(
                (error) => {
                    console.error("Error fetching feedbacks: ", error);
                }
            )

            }
            
        },[reviewsLoading])



    return(
        <div className="w-full h-full bg-primary p-6 overflow-y-auto">
              {/* Header */}
            <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border border-gray-200 shadow-lg rounded-3xl px-8 py-6 flex flex-col lg:flex-row md:flex-row items-center lg:justify-between md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-accent">
                        Reviews/Ratings
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage all your FeedBacks easily
                    </p>
                </div>

                <div className="bg-second/10 text-second px-5 py-3 rounded-2xl font-semibold mt-3 lg:mt-0">
                    {reviews.length} Reviews
                </div>
            </div>

            {/* Review Card */}
       
                {
                    reviewsLoading ?
                    <div className="flex flex-col lg:grid lg:grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 w-full h-screen mt-10 rounded-lg">
                    {
                        reviews.map((review, index)=>{
                            return(
                                <div key={index} className="w-full lg:h-fit bg-white rounded-xl p-3">
                                    <div className="flex items-center justify-evenly">
                                        <div className="m-2 flex gap-3">
                                            <img  className="w-[30px] h-[30px] rounded-full object-cover" src={review.pictures[0]}/>
                                            <div className="flex flex-col">
                                                <h3 className="font-bold text-sm">{review.name}</h3>
                                                <h4 className="text-gray-500 text-xs">{review.email}</h4>

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
                                        <h1 className="text-blue-600 font-bold text-md">{review.orderId}</h1>
                                        <h2 className="text-black font-semibold text-md">{review.subject}</h2>
                                        <p className="text-gray-600 font-semibold">{review.message}</p>
                                    </div>

                                    {/* Images */}
                                    <div className="flex overflow-x-auto gap-3 mt-5">
                                        {
                                            review.pictures.map((img, index)=>{
                                                return(
                                                    <img  className="w-[80px] h-[80px] rounded-lg cursor-pointer hover:border-2 hover:border-blue-600" src={img} onClick={()=>
                                                        {setModelOpen(true),
                                                        setSelectedImg(img)}
                                                    }></img>
                                                )
                                            })
                                        }

                                    </div>

                                    <div className="flex w-full px-10 mt-8 justify-center items-center">
                                        <ReviewDeleteModel orderId={review.orderId} refresh={()=>{setReviewsLoading(false)}}/>
                                        

                                    </div>



                                </div>
                            )
                        })
                    }
                    
                    </div>
                    :
                    <LoadingAnimation />
                }

                {
                    modelOpen &&
                    <div className="w-screen h-screen fixed bg-black/50 top-0 left-0 flex justify-center items-center  z-[99]">
                        
                       <div className="w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] md:w-[500px] md:h-[500px] relative justify-center flex">
                            <img className="rounded-2xl" src={selectedImg}></img>
                            <button className="absolute text-6xl top-2 right-2 text-red-600 hover:text-red-800 cursor-pointer"
                            onClick={() => { setModelOpen(false) }}
                            >
                            <IoCloseCircle/>
                        </button>
                       </div>
                    </div>
                }


       

        </div>
    )
}