import { useState } from "react";
import toast from "react-hot-toast";
import api from "../utils/api";

export default function CreateOrderModel(props){

    const cart = props.cart;
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [addressLineOne, setAddressLineOne] = useState("");
    const [addressLineTwo, setAddressLineTwo] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [phone, setPhone] = useState("");


    async function createOrder(){
        try{
            const token = localStorage.getItem("token");
            const data = {
                firstName,
                lastName,
                addressLineOne,
                addressLineTwo,
                city,
                state,
                postalCode,
                phone,
                items: []
            };

            for(let i = 0; i < cart.length; i++){
                const item = cart[i];
                data.items.push(
                    {
                        productId: item.product.productId,
                        quantity: item.quantity
                    }
                )
            }

            const response = await api.post("/orders", data, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })

            toast.success(response.data.message);
            setIsModelOpen(false);
            localStorage.removeItem("cart");

        }catch(error){
            toast.error("response.data.message || Error creating order");
            console.log("Error creating order:", error.message);
        }
    }

    return(
        <>
            <button className="bg-amber-500 text-white py-2 px-4 rounded-lg hover:bg-amber-600" onClick={() => setIsModelOpen(true)}>
                Order Now
            </button>

            {
                isModelOpen &&
                <div className="fixed bg-black/70 w-screen h-screen top-0 left-0 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-5 flex flex-col w-[400px] gap-4">
                        <h1 className="text-2xl font-bold">Shipping Details</h1>
                        <input type="text" placeholder="First Name" className="border p-2 rounded-lg w-full" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        <input type="text" placeholder="Last Name" className="border p-2 rounded-lg w-full" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        <input type="text" placeholder="Address Line 1" className="border p-2 rounded-lg w-full" value={addressLineOne} onChange={(e) => setAddressLineOne(e.target.value)} />
                        <input type="text" placeholder="Address Line 2" className="border p-2 rounded-lg w-full" value={addressLineTwo} onChange={(e) => setAddressLineTwo(e.target.value)} />
                        <input type="text" placeholder="City" className="border p-2 rounded-lg w-full" value={city} onChange={(e) => setCity(e.target.value)} />
                        <input type="text" placeholder="State" className="border p-2 rounded-lg w-full" value={state} onChange={(e) => setState(e.target.value)} />
                        <input type="text" placeholder="Postal Code" className="border p-2 rounded-lg w-full" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                        <input type="text" placeholder="Phone Number" className="border p-2 rounded-lg w-full" value={phone} onChange={(e) => setPhone(e.target.value)} />

                        <div className="w-full flex flex-row justify-between items-center">
                            <button className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600" onClick={() => setIsModelOpen(false)}>
                                Cancel
                            </button>
                            <button className="bg-amber-500 text-white py-2 px-4 rounded-lg hover:bg-amber-600" onClick={createOrder}>
                                Submit Order
                            </button>
                        </div>

                    </div>
                </div>
            }

        </>
    )
        
}