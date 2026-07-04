import { useEffect, useState } from "react";



export default function ImageSlideShow(props){
    const images = props.images || [];
    const [activeImage, setActiveImage] = useState(0);

    return(
        <div className="w-[500px] lg:h-[600px] flex flex-col">
            <img className="w-full aspect-square object-cover" src={images[activeImage]} alt="Product Image" />

            <div className="h-[100px] w-full flex items-center justify-center gap-2">
                {
                    images.map(
                        (image, index) => {
                            return(
                                <img className={"w-[90px] h-[90px] cursor-pointer rounded-xl " + (index === activeImage ? "border-4 border-accent" : "")} src={image} key={index}
                                onClick={() => {setActiveImage(index)}}
                                />
                            )
                        }
                    )
                }

            </div>

        </div>
    )
}