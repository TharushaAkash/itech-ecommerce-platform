import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import uploadMedia from "../../src/utils/mediaUpload";
import axios from "axios";

export default function AdminEditProduct(){

    const location = useLocation();
    const navigate = useNavigate();

    const [productId, setProductId] = useState(location.state?.productId);
    const [name, setName] = useState(location.state?.name);
    const [altNames, setAltNames] = useState(location.state?.altNames.join(','));
    const [price, setPrice] = useState(location.state?.price);
    const [labeledPrice, setLabeledPrice] = useState(location.state?.labeledPrice);
    const [description, setDescription] = useState(location.state?.description);
    const [images, setImages] = useState([]);
    const [brand, setBrand] = useState(location.state?.brand);
    const [model, setModel] = useState(location.state?.model);
    const [category, setCategory] = useState(location.state?.category);
    const [isAvailable, setIsAvailable] = useState(location.state?.isAvailable);
    const [stock, setStock] = useState(location.state?.stock);

    useEffect(
        () => {
            if(location.state == null){
                toast.error("No product data found. Please select a product to edit.");
                navigate("/admin/products");
            }
        },[]
    )
    

    const product = location.state?.product;
   
    async function handleSave(){
        try{
            //token is saved when login
            const token = localStorage.getItem("token");
            if(token == null){
                navigate("/login");
                return;
            }

            //Upload images
            const mediaUrls = [];

            for(let i=0; i < images.length; i++){
                mediaUrls.push(await uploadMedia(images[i]));
            }

            //const urls = await Promise.all(mediaUrls);
            const altNamesArray = altNames.split(',');
            const productData = {
                productId: productId,
                name: name,
                altNames: altNamesArray,
                price: price,
                labeledPrice: labeledPrice,
                description: description,
                images: mediaUrls,
                brand: brand,
                model: model,
                category: category,
                stock: Number(stock)
            }


            const response = await axios.post(import.meta.env.VITE_API_URL+"/products", productData,{
                headers : {
                    "Authorization": "Bearer " + token
                }
            }  
            )

            toast.success(response.data.message);
            navigate("/admin/products");

        }catch(error){
            toast.error(error?.response?.data?.message || "Failed to add product. Plz try again")
            console.log(error.message);
        }

    }
    

    return(
        <div className="w-full h-full flex flex-col items-center p-4 overflow-y-scroll">
            {/* header div */}
            <div className=" sticky top-0 w-full h-[100px] bg-accent text-white rounded-lg flex items-center p-5 justify-between">
                <h1 className="text-2xl font-semibold ">Edit Product</h1>

                {/* Header button div */}
                <div className="h-full flex justify-center items-center">
                    <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400">Update</button>
                    <button className="ml-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Cancel</button>
                </div>
            </div>

            {/* Inputs fields */}

            <div className="w-full flex flex-wrap bg-white p-5 mt-8 rounded-lg">

                <div className="w-1/4 p-2">
                    <label className="block mb-2 font-semibold">Product Id</label>
                    <input className="border border-gray-300 rounded-md p-2 w-full"
                    value={productId}
                    onChange={(e) => {
                        setProductId(e.target.value);
                    }}
                    />
                </div>

                <div className="w-3/4 p-2">
                    <label className="block mb-2 font-semibold">Name</label>
                    <input className="border border-gray-300 rounded-md p-2 w-full" 
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    />
                </div>


                <div className="w-full p-2">
                    <label className="block mb-2 font-semibold">Alternative Names (comma separated)</label>
                    <input className="border border-gray-300 rounded-md p-2 w-full" 
                    value={altNames}
                    onChange={(e) => {
                        setAltNames(e.target.value);
                    }}
                    />
                </div>


                <div className="w-1/4 p-2">
                    <label className="block mb-2 font-semibold">Price</label>
                    <input className="border border-gray-300 rounded-md p-2 w-full"
                    value={price}
                    onChange={(e) => {
                        setPrice(e.target.value);
                    }}
                    />
                </div>

                <div className="w-1/4 p-2">
                    <label className="block mb-2 font-semibold">Label Price</label>
                    <input className="border border-gray-300 rounded-md p-2 w-full"
                    value={labeledPrice}
                    onChange={(e) => {
                        setLabeledPrice(e.target.value);
                    }}
                    />
                </div>


                <div className="w-1/4 p-2">
                    <label className="block mb-2 font-semibold">Category</label>
                    <select 
                    value={category}  
                    onChange={(e) => {
                        setCategory(e.target.value);
                    }}className="border border-gray-300 rounded-md p-2 w-full m-2"
                    
                    >
                        <option value="Laptop">Laptop</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Headphones">Headphones</option>
                        <option value="Camara">Camara</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                {/* Images */}

                <div className="w-1/4 p-2">
                    <label className="block mb-2 font-semibold">Images</label>
                    <input type="file" multiple={true}
                    className="border border-gray-300 rounded-md p-2 w-full"
                    onChange={(e) => {
                        setImages(e.target.files);
                        console.log(images)
                    }}
                    />
                </div>


                <div className="w-full p-2">
                    <label className="block mb-2 font-semibold">Description</label>
                    <textarea className="border border-gray-300 rounded-md p-2 w-full"
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                    />
                </div>

                <div className="w-1/4 p-2">
                    <label className="block mb-2 font-semibold">Brand</label>
                    <select 
                    value={brand}  
                    onChange={(e) => {
                        setBrand(e.target.value);
                    }}className="border border-gray-300 rounded-md p-2 w-full"
                    
                    >
                        <option value="Apple">Apple</option>
                        <option value="Samsung">Samsung</option>
                        <option value="Sony">Sony</option>
                        <option value="Dell">Dell</option>
                        <option value="HP">HP</option>
                        <option value="Lenovo">Lenovo</option>
                        <option value="Asus">Asus</option>
                        <option value="Others">Others</option>
                    </select>
                </div>



                <div className="w-1/4 p-2">
                    <label className="block mb-2 font-semibold">Model</label>
                    <input className="border border-gray-300 rounded-md p-2 w-full"
                    value={model}
                    onChange={(e) => {
                        setModel(e.target.value);
                    }}
                    />
                </div>



                <div className="w-1/4 p-2">
                    <label className="block mb-2 font-semibold">Stock</label>
                    <input className="border border-gray-300 rounded-md p-2 w-full"
                    value={stock}
                    onChange={(e) => {
                        setStock(e.target.value);
                    }}
                    />
                </div>


                <div className="w-1/4 p-2">
                    <label className="block mb-2 font-semibold">Available</label>
                    <select className="border border-gray-300 rounded-md p-2 w-full"
                    value={isAvailable}
                    onChange={(e) => {
                        setIsAvailable(e.target.value === "true");
                    }}
                    >
                    <option value={true} className="bg-green-400 text-white">Available</option>
                    <option value={false} className="bg-red-600 text-white">Not Available</option>
                    </select>
                    
                </div>
            </div>
            
        </div>
    )
}