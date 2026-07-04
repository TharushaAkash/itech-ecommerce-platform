import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiFillProduct } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import UserData from "./userData";

export default function BottomNavigationBar(){
    return(
        <div className="flex justify-evenly lg:hidden fixed bottom-0 w-full h-[80px] p-2 gap-3 bg-white shadow-[0_-4px_12px_-4px_rgba(0,0,0,0.25)]">
            <Link to="/" className="h-full flex justify-center items-center rounded-lg text-accent text-3xl font-extrabold shadow-2xl shadow-accent">
                <FaHome />
            </Link>

            <Link to="/products" className="h-full flex justify-center items-center text-accent text-3xl font-extrabold shadow-2xl">
                <AiFillProduct />
            </Link>

            <Link to="/cart" className="h-full flex justify-center items-center rounded-lg text-accent text-3xl font-bold  shadow-accent">
                <FaShoppingCart />
            </Link>
            <UserData />

        </div>
    )
}