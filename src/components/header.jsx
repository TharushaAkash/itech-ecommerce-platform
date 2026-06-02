import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";

export default function Header (){
    return(
         <header className="w-full h-[100px] bg-accent relative flex items-center justify-center flex-shrink-0">
            <Link to="/" className="w-[100px] h-full  absolute left-10 flex justify-center items-center">
                <img src="/logo.png" alt="logo" className="absolute w-full  object-cover rounded-lg mr-2"/>

            </Link>

            <div className="h-full flex justify-center items-center gap-10">
                <Link to="/" className=" text-white font-semibold">
                    Home
                </Link>
                <Link to="/products" className=" text-white font-semibold">
                    Products
                </Link>

                <Link to="/contact-us" className=" text-white font-semibold">
                    Contact Us
                </Link>
            </div>
            <Link to="/cart" className="w-[50px] h-[50px]  absolute right-10 flex justify-center items-center">
                <FaCartShopping className="text-2xl text-white"/>
            </Link>

         </header>
    )
}