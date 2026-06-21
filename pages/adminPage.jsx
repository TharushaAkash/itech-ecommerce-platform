import { Link, Route, Routes } from "react-router-dom";
import ProductPage from "./admin/adminProductsPage";
import AddProduct from "./admin/adminAddProduct";
import AdminEditProduct from "./admin/adminEditProduct";
import AdminOrdersPage from "./admin/adminOrdersPage";
import { TiThMenu } from "react-icons/ti";
import { useState } from "react";
import MobileSideBar from "../src/components/mobileSideBar";
import AdminUsersPage from "./admin/adminUsersPage";
import AdminFeedBackPage from "./admin/adminFeedBackPage";

export default function AdminPage(){

    const [isMenueOpen, setIsMenuOpen] = useState(false);
    return(
         <div className= 'w-full h-screen flex items-center bg-accent relative'>
            {/* Side bar for admin dashboard */}
            <div className=" hidden lg:flex lg:flex-col w-[200px] h-full text-white">
                {/* ctr + /  = comment */}
                <h1 className="text-2xl font-bold mb-4">Admin DashBoard</h1>
                <Link to="/" className="block py-2 hover:bg-gray-700">Home</Link>
                <Link to="/admin" className="block py-2 hover:bg-gray-700">Orders</Link>
                <Link to="/admin/products" className="block py-2 hover:bg-gray-700">Products</Link>
                <Link to="/admin/users" className="block py-2 hover:bg-gray-700">Users</Link>
                <Link to="/admin/reviews" className="block py-2 hover:bg-gray-700">Reviews /Ratings</Link>
            </div>

            {/* Side bar for mobile devices */}
            <div className="absolute fixed top-10 left-3 lg:hidden bg-green-500 p-3 rounded-full hover:bg-green-800 z-99">
                <TiThMenu onClick={()=>{setIsMenuOpen(true)}}/>
            </div>
            {
                isMenueOpen &&
                    <MobileSideBar menue={()=>{setIsMenuOpen(false)}}/>
            }

          


            {/*Dynamic Content area*/}
            <div className="w-full lg:w-[calc(100%-200px)] h-full bg-primary border-[10px] border-accent rounded-2xl overflow-hidden">
                <Routes>
                    <Route path="/" element={<AdminOrdersPage />}/>
                    <Route path="/products" element={<ProductPage />}/>
                    <Route path="/add-products" element={<AddProduct />} />
                    <Route path="/users" element={<AdminUsersPage />}/>
                    <Route path="/edit-product" element={<AdminEditProduct />}/>
                    <Route path="/reviews" element={<AdminFeedBackPage />} />
                </Routes>

            </div>
        </div>
    )
}