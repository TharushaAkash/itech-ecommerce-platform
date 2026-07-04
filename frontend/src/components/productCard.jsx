import { Link } from "react-router-dom";

export default function ProductCard(props){
    const product = props.product;


    return(
        <Link to={"/overview/"+product.productId} className="w-[300px] h-[400px] flex flex-col m-10 bg-white rounded-lg shadow-2xl overflow-hidden justify-between cursor-pointer">

            <div className="w-[300px] h-[300px] bg-red-900 relative">
                <img src={product.images[0]} className="w-full h-full object-cover absolute top-0 left-0"></img>
                <img src={product.images[1]} className="w-full h-full object-cover absolute top-0 left-0 opacity-0 hover:opacity-100 transition-all duration-500"></img>
            </div>
            
            <h1 className="text-lg font-bold mt-2 px-2">{product.name}</h1>
            <div className="w-full flex flex-col lg:py-4">
                {
                    product.labeledPrice > product.price && 
                    <span className="text-sm text-gray-500 mt-2 px-4 line-through">Rs.{product.labeledPrice}</span>
                }
                <span className=" text-xl lg:text-lg font-bold mt-1 px-4 py-2 lg:py-0">Rs. {product.price}</span>

            </div>
        

        </Link>
        
    )
}