import Header from "../src/components/header";
import { Routes, Route } from "react-router-dom";
import ProductsPage from "./productsPage";
import OverviewPage from "./overviewPage";
import CartPage from "./cartPage";
import CheckoutPage from "./checkoutPage";
import CustomerOrdersPage from "./customerMyOrdersPage";
import SettingsPage from "./settingsPage";
import TestPage from "./test";
import BottomNavigationBar from "../src/components/bottomNavigationBar";
import NotFoundPage from "./notFoundPage";
import LandingPage from "./landingPage";

export default function HomePage(){
    return(
         <div className= 'w-full h-screen flex flex-col'>
            <Header />

            <div className="w-full min-h-[calc(100%-100px)] overflow-y-auto">
                
                <Routes>
                    <Route path="/" element={<LandingPage />}></Route>
                    <Route path="/products" element={<ProductsPage />}></Route>
                    <Route path="/contact-us" element={<h1>Contact Us Page</h1>}></Route>
                    <Route path="/overview/:productId" element={<OverviewPage />}></Route>
                    <Route path="/cart" element={<CartPage />}></Route>
                    <Route path="/checkout" element={<CheckoutPage />}></Route>
                    <Route path="/my-orders" element={<CustomerOrdersPage />}></Route>
                    <Route path="/settings" element={<SettingsPage />}></Route>
                    <Route path="/test" element={<TestPage/>}></Route>
                    <Route path="/*" element={<NotFoundPage />}></Route>

                </Routes>
                <BottomNavigationBar />

            </div>
        </div>
    )
}