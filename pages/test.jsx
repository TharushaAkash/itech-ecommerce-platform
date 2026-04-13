import { useState } from "react"

export default function TestPage(){

    const[emotion, setEmotion] = useState()

    return(
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <div className="w-[300px] h-[300px] text-7xl border-[6px] flex justify-center items-center">
                {emotion}
            </div>
``
            <div className="w-[300px] flex flex-row justify-center">
                <button onClick={() =>{
                    setEmotion("😓")
                }} className="bg-second w-[70px] h-[30px] text-white border border-primary cursor-pointer">Sad</button>
                <button onClick={()=>{
                    setEmotion("☺️")
                }}className="bg-second w-[70px] h-[30px] text-white border border-primary cursor-pointer">Neutral</button>
                <button onClick={()=>{
                    setEmotion("😂")
                }} className="bg-second w-[70px] h-[30px] text-white border border-primary cursor-pointer">Happy</button>
            </div>
        </div>
    )
}