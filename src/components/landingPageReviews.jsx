import { useEffect, useState } from "react"
import api from "../utils/api";
import LoadingAnimation from "./loadingAnimation";
import ReviewDeleteModel from "./reviewDeleteModel";
import { FaStar } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";


export default function LandingPageReviews(){
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hover, setHover] = useState(false);

    useEffect(
        ()=>{
            if(!isLoading){
                const response = api.get("/feedback/reviews").then(
                    (response)=> {
                        setIsLoading(true);
                        setReviews(response.data.feedBacks)
                    }).catch(
                        (err)=>{
                            console.log("Error loading reviews");
                        }
                    )
            }
        },[isLoading]
    )


    


    return(
        <div className="w-full">
                {
                isLoading ?
                <div className="flex gap-4 w-full h-[250px] overflow-x-auto scrollbar-hide scroll-smooth">
                        
                    {
                        reviews.map((review, index)=> {
                            return(
                                <div key={index} className="h-full min-w-[300px] bg-white rounded-xl p-3">
                                    <div className="flex items-center justify-evenly">
                                        <div className="m-2 flex gap-3">
                                            <img  className="w-[30px] h-[30px] rounded-full object-cover" src={review.image}/>
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
                                            <h2 className="text-black font-semibold text-md">{review.subject}</h2>
                                                <p className="text-gray-600 font-semibold">{review.message.length > 50 ? review.message.substring(0, 50) + "..." : review.message}</p>
                                    </div>
                                
                                    {/* Images */}
                                    {/* <div className="flex overflow-x-auto gap-3 mt-5">
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
                                    </div> */}
                                
                                
                                
                                </div>
                                                            
                            )
                        })
                    }
                
                </div>
                :

                <LoadingAnimation />

            }

    </div>
    )
}