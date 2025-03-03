"use client"
import { firebase_auth } from "@/utils/firebase_config";
import axios from "axios";
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

export default function Login () {

    console.log(process.env.NEXT_PUBLIC_API_URL)

    const handle_sigin =  async(provider)=> {
        const auth_provider = provider === 'google' ? new GoogleAuthProvider() : provider === 'githob' ? new GithubAuthProvider() : new FacebookAuthProvider()
        const {user: {email, displayName: user_name,photoURL: profile_image_url}} = await signInWithPopup(firebase_auth,auth_provider);
        console.log(user_name,profile_image_url,email);

        try {
            if(email) {

                const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/find_user`,{email})

                console.log(data)

            }
        }
        catch (error){
            console.log(error)
        }
    };

    const SignInBTN = ({provider,Icon})=> {
        return (
            <button 
                className="flex justify-center items-center gap-2 px-3 py-1 rounded-sm bg-emerald-200 cursor-pointer"
                onClick={handle_sigin}
                >
                <Icon/>
                <span>{`sigin with ${provider}`}</span>
            </button>
        )
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <SignInBTN 
                provider='google' 
                Icon={FcGoogle} 
                handle_click={()=> handle_sigin('google')} 
                />
            <SignInBTN 
                provider='githob' 
                Icon={FcGoogle} 
                handle_click={()=> handle_sigin('githob')} 
                />
             <SignInBTN 
                provider='facebook' 
                Icon={FcGoogle} 
                handle_click={()=> handle_sigin('facebook')} 
                />
        </div>
    )
}