import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ProductCard from "../src/components/productCard";
import api from "../src/utils/api";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function ProductsPage(){

    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState("");
    const [productsLoading, setProductsLoading] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(
        () => {
            if(!productsLoading){
                //call backend Api
                axios.get(import.meta.env.VITE_API_URL+"/products", {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }).then(
                    (response) => {
                        setProducts(response.data.products);
                        setProductsLoading(true);
                    }
                ).catch(
                    (error) => {
                        toast.error("Error fetching products. Plz try again");
                        console.error("Error fetching products: ", error);
                    }
                )
            }
        },[productsLoading]
    )

    async function handleSearch(){
        try{
            const response = await api.get("/products/search/"+query);
            setProducts(response.data);
            console.log(response.data)

        }catch(err){
            toast.error("Error searching products");
            console.log(err.message);
        }
    }
    return(
        <div className="w-full h-full flex justify-center flex-wrap pb-24 overflow-y-auto pt-5">
            <div className="w-full h-[80px] flex justify-center items-center gap-3">
                <input
                    type="text"
                    // value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search Products"
                    className="bg-gray-300 border-1 border-gray-400  w-1/2 p-3 rounded-lg focus:outline-none focus:border-none focus:ring-2 focus:ring-blue-600"
                    onClick={()=>{}}
                ></input>

                <button className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 cursor-pointer" onClick={handleSearch}>Search</button>
                <button className="hidden lg:flex bg-green-500 text-white p-3 rounded-lg hover:bg-green-700 cursor-pointer" onClick={()=>{setProductsLoading(false)}}>All Products</button>
                <button className="p-3 rounded-lg bg-green-600 lg:hidden" onClick={()=>{setProductsLoading(false)}}><IoMdArrowRoundBack /></button>

            </div>

            {
                products.map(
                    (product, index) => {
                        return(
                           <ProductCard key={index} product={product} />

                        )
                    }
                )
            }
    
        </div>
    )
}