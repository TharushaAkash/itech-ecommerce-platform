import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

export default function ProductPage(){
    return(
         <div className= 'w-full h-full'>
            <Link to="/admin/add-products" className="fixed bottom-8 right-8 w-[60px] h-[60px] flex justify-center items-center bg-accent text-white text-2xl rounded-full shadow-lg hover:bg-transparent hover:text-accent hover:border-3 border-accent  cursor-pointer">
            <FaPlus />
            </Link>
            
        </div>
    )
}