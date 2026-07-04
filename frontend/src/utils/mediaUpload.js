import { createClient } from "@supabase/supabase-js";

let url = "https://hfjrthrkmuckaegrzctw.supabase.co"
let key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmanJ0aHJrbXVja2FlZ3J6Y3R3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2Njg0NTYsImV4cCI6MjA5MjI0NDQ1Nn0.piDRiY1QV3t4AzaCXStJ5h76gAXP2xe4EjRzwMUzYpo"
const superbase = createClient(url, key);

export default function uploadMedia(file){
    return new Promise(
        (resolve, reject) => {
            if(file == null){
                reject("No file provided");
            }else{
                const timeStamp = new Date().getTime();
                const fileName = timeStamp + "_" + file.name;


                superbase.storage.from("images").upload(fileName, file, {
                upsert: false,
                cacheControl: "3600"
                })
                .then(() => {
                    const publicUrl = superbase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
                    resolve(publicUrl);

                }).catch((error) => {
                    reject("Error uploading file: ", error);
            })
            }
        }
    )
}