import { useEffect, useState } from "react"
import LoadingAnimation from "../src/components/loadingAnimation"
import api from "../src/utils/api";
import uploadMedia from "../src/utils/mediaUpload";
import toast from "react-hot-toast";

export default function SettingsPage(){
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);


    useEffect(
        () => {
            const token = localStorage.getItem("token")
            if (token) {
                api.get("users/me", {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                })
                    .then(response => {
                        setUser(response.data)
                        setFirstName(response.data.user.firstName)
                        setLastName(response.data.user.lastName)
                        setImageFile(response.data.image)
                    }).catch(error => {
                        console.log(error)
                    })
            }
        }
        , [])

        async function updateProfile(){
            setIsUpdatingProfile(true)
            const token = localStorage.getItem("token");
            let image = user.image
            try{
                if(imageFile){
                    image = await uploadMedia(imageFile)
                }
                const response = await api.put("/users/", {
                    firstName: firstName,
                    lastName: lastName,
                    image: image},{
                        headers: {
                            Authorization: "Bearer " + token
                        }
                    }
                )
                localStorage.setItem("token", response.data.token)
                toast.success("Profile updated succesfuly");
                setIsUpdatingProfile(false);
                window.location.reload();
                }catch(err){
                    console.log(err.message);
                    setIsUpdatingProfile(false);
                    toast.error("Failed to upload image");
                    return;
            }
        }

        async function updatePassword(){
            if(password !== confirmPassword){
                toast.error("Password do not match")
                return;
            }
            setIsUpdatingPassword(true)

            const token = localStorage.getItem("token");
            try{
                await api.put("/users/password", {
                    email: user.user.email,
                    password: password
                }, {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                toast.success("Password updated successfully");
                setPassword("")
                setConfirmPassword("")
                setIsUpdatingPassword(false)
            }catch(err){
                console.log(err.message)
                setIsUpdatingPassword(false)
                toast.error("Failed to update the password")
            }
        }
    return(
        <div className="w-full h-full flex flex-col items-center lg:flex-row gap-4 mt-4 lg:justify-center">

            {
                user ?
                <>
                <div className="w-[400px] bg-white shadow-lg p-6">
                    <h1 className="text-2xl font-bold mb-4">Basic Information</h1>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">First Name:</label>
                        <input 
                        value={firstName}
                        onChange={(e)=>setFirstName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded">
                        </input>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">last Name:</label>
                        <input 
                        value={lastName}
                        onChange={(e)=>setLastName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded">
                        </input>

                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Profile Image:</label>
                        <input 
                        type="file"
                        onChange={(e)=>setImageFile(e.target.files[0])}
                        className="w-full p-2 border border-gray-300 rounded">
                        </input>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={updateProfile}>{isUpdatingProfile ? "Updating..." : "Update Profile" }</button>

                </div>

                <div className="w-[400px] h-[400px] bg-white shadow-lg p-6">
                    <h1 className="text-2xl font-bold mb-4">Change Password</h1>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">New Password:</label>
                        <input 
                        type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded">
                        </input>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Confirm Password:</label>
                        <input 
                        type="password"
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded">
                        </input>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={updatePassword}>{isUpdatingPassword ? "Updating..." : "Update Password"}</button>

                </div>
                </>
                :
                <LoadingAnimation />
            }
            
           
        </div>
    )
}