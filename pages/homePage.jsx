import Header from "../src/components/header";
import { Routes, Route } from "react-router-dom";
import ProductsPage from "./productsPage";
import OverviewPage from "./overviewPage";

export default function HomePage(){
    return(
         <div className= 'w-full h-screen flex flex-col'>
            <Header />

            <div className="w-full min-h-[calc(100%-100px)] overflow-y-scroll">
                <Routes>
                    <Route path="/" element={<h1>welcome to computer store</h1>}></Route>
                    <Route path="/products" element={<ProductsPage />}></Route>
                    <Route path="/contact-us" element={<h1>Contact Us Page</h1>}></Route>
                    <Route path="/overview/:productId" element={<OverviewPage />}></Route>

                </Routes>

            </div>
        </div>
    )
}