import { addToCart, getCart } from "../src/utils/cart"
import { useState } from "react";
import priceFormat from "../src/utils/priceFormat";


export default function CartPage(){
    const [cart, setCart] = useState(getCart());
    return(
        <div className="w-full h-full p-5">
            <h1 className="text-left mb-3">Home /
                <span className="font-bold"> Cart</span>
            </h1>
            <div className="text-4xl font-bold mb-5">
                <h1>Your Cart</h1>
            </div>
            {/* Main Content */}
            <div className="w-full h-full flex flex-col items-center">
                {
                    cart.map(
                        (item) => {
                            return(
                                <div key={item.product.productId}className="bg-white w-[500px] h-[150px] rounded-lg shadow-2xl mb-3 p-2 flex items-center relative">
                                    <img src={item.product.image} alt={item.product.name} className="w-[100px] h-[100px] object-cover rounded-lg" />
                                    <div className="h-full w-[400px]">
                                        <h1 className="text-lg font-semibold">{item.product.name}</h1>
                                        <p className="text-sm text-gray-500">{item.product.productId}</p>
                                        {
                                            item.product.labeledPrice > item.product.price &&
                                            <span className="text-sm text-gray-500 mt-2 line-through">{priceFormat(item.product.labeledPrice)}</span>
                                        }
                                        <p className="text-accent font-semibold text-sm">
                                            {priceFormat(item.product.price)}
                                        </p>
                                    </div>

                                    <div className=" w-[200px] h-full absolute right-2 flex flex-col justify-end items-end p-2">
                                        <div className="w-[100px] h-[30px] border rounded-full flex items-center justify-between px-2">
                                            <button
                                                onClick={()=> {
                                                    addToCart(item.product, -1)
                                                    setCart(getCart())
                                                }} 
                                                className="text-xl font-bold cursor-pointer hover:text-accent">-</button>
                                            <span>{item.quantity}</span>
                                            <button 
                                                onClick={()=> {
                                                    addToCart(item.product, 1)
                                                    setCart(getCart())
                                                }}
                                                className="text-xl font-bold cursor-pointer hover:text-accent">+</button>
                                        </div>

                                        <p className="text-lg mt-2"><span className="font-semibold">{priceFormat(item.product.price * item.quantity)}</span></p>

                                    </div>
                                </div>
                            )
                        }
                    )
                }
            </div>

        </div>
    )
}