import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import uploadMedia from "../src/utils/mediaUpload";

let url = "https://hfjrthrkmuckaegrzctw.supabase.co";
let key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmanJ0aHJrbXVja2FlZ3J6Y3R3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2Njg0NTYsImV4cCI6MjA5MjI0NDQ1Nn0.piDRiY1QV3t4AzaCXStJ5h76gAXP2xe4EjRzwMUzYpo";
const superbase = createClient(url, key);

export default function TestPage() {
  const [file, setFile] = useState(null);

  async function handleUpload() {
    console.log(file);
    //send to superbase
    try {
      const url = await uploadMedia(file);
      console.log(url);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-full h-full bg-red-900 flex justify-center items-center p-5">
      <div className="bg-green-500 md:bg-amber-400  lg:bg-blue-700 w-[500px] h-[500px]"></div>
    </div>
  );
}
