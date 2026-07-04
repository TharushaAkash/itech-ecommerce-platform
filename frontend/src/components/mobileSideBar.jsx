import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { FaShopify } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { HiUsers } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { MdReviews } from "react-icons/md";


export default function MobileSideBar(props){
    const {menue} = props;
    return(
        <div className="w-[250px] h-full backdrop-blur-xl fixed top-0 left-0 z-99">
            {/* close button */}
            <div className="w-full flex justify-end mt-4">
                <IoMdCloseCircleOutline className="text-3xl text-green-800" onClick={()=>{menue()}}/>
            </div>

            {/* Menue Items */}
            <div className="w-full flex gap-4 items-center justify-center mt-12 border-b-1 border-gray-200">
                <FaHome className="text-3xl text-black"/>
                <Link to="/" className="text-2xl  text-black">Home</Link>
            </div>

            <div className="w-full flex gap-4 items-center justify-center mt-10 border-b-1 border-gray-200">
                <FaShopify className="text-3xl text-black"/>
                <Link to="/admin" className="text-2xl text-black" onClick={menue}>Orders</Link>
            </div>


            <div className="w-full flex gap-4 items-center justify-center mt-10 border-b-1 border-gray-200">
                <AiFillProduct className="text-3xl text-black"/>
                <Link to="/admin/products" className="text-2xl text-black" onClick={menue}>Products</Link>
            </div>

            <div className="w-full flex gap-4 items-center justify-center mt-10 border-b-1 border-gray-200">
                <HiUsers className="text-3xl text-black"/>
                <Link to="/admin/users" className="text-2xl text-black" onClick={menue}>Users</Link>
            </div>
            <div className="w-full flex gap-4 items-center justify-center mt-10 border-b-1 border-gray-200">
                <MdReviews className="text-3xl text-black"/>
                <Link to="/admin/reviews" className="text-2xl text-black" onClick={menue}>Reviews</Link>
            </div>

            

        </div>
    )
}

{/* 
<FaShopify />
<AiFillProduct />
<HiUsers /> */}