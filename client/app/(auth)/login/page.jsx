"use client"
import { firebase_auth } from "@/utils/firebase_config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

export default function Login () {

    const handle_sigin =  async()=> {
        const provider = new GoogleAuthProvider();
        const {user: {email, displayName: user_name,photoURL: profile_image_url}} = await signInWithPopup(firebase_auth,provider);
        console.log(user);

        try {
            if(email) {
                
            }
        }
        catch (error){

        }
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <button 
                className="flex justify-center items-center gap-2 px-3 py-1 rounded-sm bg-emerald-200 cursor-pointer"
                onClick={handle_sigin}
                >
                <FcGoogle />
                <span>signin with google</span>
            </button>
        </div>
    )
}