import { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { MdEmail, MdRateReview, MdStarRate } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import uploadMedia from "../utils/mediaUpload";
import api from "../utils/api";
import toast from "react-hot-toast";
import { LuLoaderCircle } from "react-icons/lu";

export default function CustomerFeedbackModal(props){

    const [showModel, setShowModel] = useState(false);
    const {order} = props;
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState(0);
    const [pictures, setPictures] = useState([]);
    const token = localStorage.getItem("token");
    const [isLoading, setIsLoading] = useState(false);

    const [productId, setProductId] = useState(order.items[0].product.productId);

async function handleFeedBack(){
    try{
        const mediaUrls = [];
        
        for(let i=0; i < pictures.length; i++){
            mediaUrls.push(await uploadMedia(pictures[i]));
        }

        const feedBack = {
            name: order.firstName,
            email: order.email,
            rating: rating,
            orderId: order.orderId,
            productId: productId,
            subject: subject,
            message: message,
            pictures: mediaUrls

        }

        const response = await api.post("/feedback", feedBack,{
            headers : {
                "Authorization": "Bearer " + token
            }
        })
        console.log("Created successful")
        setShowModel(false);
        setIsLoading(false);
        toast.success(response.data.message);

    }catch(err){
        toast.error("Error Creating feedback")
        console.log(err.message)
    }
        

}
    

    return(
        <>
            {
                order.status === "Delivered" ? <MdRateReview className="text-xl text-green-700 mt-1 cursor-pointer hover:text-accent" 
                onClick={()=>{setShowModel(true)}}
            />
            :
            ""
            }

            {
                showModel &&
                <div className="w-screen h-screen fixed bg-black/50 top-0 left-0 flex justify-center items-center z-[99]">
                    <div className="bg-white w-[500px] h-[500px] relative rounded-2xl border-t-5 border-blue-600 p-5 overflow-y-auto">

                        <button className="absolute text-2xl top-2 right-2 text-red-600 hover:text-red-800 cursor-pointer"
                            onClick={() => { setShowModel(false) }}
                            >
                            <IoCloseCircle />
                        </button>

                        <h1 className="text-lg font-bold">How you are feeling about this product ?</h1>
                        {/* stars */}
                        <div className="w-full bg-gray-200 mt-3 flex justify-evenly items-center p-5 rounded-lg">
                            {[1, 2, 3, 4, 5].map((star) => {
                                return(
                                <FaStar 
                                    key={star}
                                    size={30}
                                    className={`cursor-pointer ${star <= rating ? "text-yellow-400" : "text-gray-300 stroke-yellow-400"}`}

                                    onClick={()=>{setRating(star)}}
                                />)
                            })}

                        </div>
                        <h>Rate: {rating}/5</h>
                        
                        <div className="flex flex-col mt-5">
                            <label className="text-left font-semibold">Select Product:</label>
                            <select 
                                value={productId}
                                onChange={((e)=>{setProductId(e.target.value)})}
                                className="bg-gray-200 mt-2 w-full p-2 rounded-2xl focus:outline-none focus:border-2 focus:border-blue-600"
                            >
                                {
                                    order.items.map((item, index) => {
                                        return <option key={index} value={item.product.productId}>{item.product.name}</option>
                                    })
                                }
                            </select>
                        </div>

                        <div className="flex flex-col mt-5">
                            <label className="text-left font-semibold">Subject:</label>
                            <input 
                                placeholder="eg: Product Features"
                                value={subject}
                                onChange={((e)=>{setSubject(e.target.value)})}
                                className="bg-gray-200 mt-2 w-full p-2 rounded-2xl focus:outline-none focus:border-2 focus:border-blue-600"
                                />
                        </div>


                        <div className="flex flex-col mt-5">
                            <label className="text-left font-semibold">Message:</label>
                            <textarea
                                placeholder="eg: The items looks good!!"
                                value={message}
                                onChange={((e)=>{setMessage(e.target.value)})}
                                className="bg-gray-200 mt-2 w-full  p-2 rounded-2xl cursor-pointer focus:outline-none focus:border-2 focus:border-blue-600"
                                />
                        </div>


                        {/* Photos */}
                        <div className="flex flex-col mt-5">
                            <label className="text-left font-semibold">Images:</label>
                            <input
                                type="file" multiple={true}
                                onChange={(e)=>{setPictures(Array.from(e.target.files))}}

                            />
                        </div>
                        {/* show images */}
                        <div className="flex w-full gap-3 p-2">
                            {
                                pictures.map((img, index)=>{
                                    return(
                                        <img
                                            key={index}
                                            src={URL.createObjectURL(img)}
                                            className="w-[80px] h-[80px]  object-cover rounded-lg"
                                        />
                                        
                                    )
                                })
                            }
                            

                        </div>

                        {/* Submit button */}
                        <button className="bg-blue-600 px-5 py-2 rounded-2xl text-lg font-bold text-white"
                             onClick={()=>
                             {handleFeedBack(), setIsLoading(true)}}>
                                {isLoading ? <LuLoaderCircle className="animate-spin"/>: "Submit"}
                                </button>
                    </div>

                </div>
            }


        </>
    )
}