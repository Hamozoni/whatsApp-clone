"use client"
import { firebase_auth } from "@/utils/firebase_config";
import axios from "axios";
import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function Login () {

    const handle_sigin =  async(provider)=> {
        console.log(provider)
        const auth_provider = provider === 'google' ? new GoogleAuthProvider() :  new GithubAuthProvider() 
        await signInWithPopup(firebase_auth,auth_provider)
        .then(async({user})=> {
            console.log(user)

            const {email, displayName: user_name,photoURL: profile_image_url} = user;
            try {
                if(email) {
    
                    const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/find_user`,{email})
    
                    console.log(data)
    
                }
            }
            catch (error){
                console.log(error)
            }
        })
        .catch((error)=> {
            console.log(error)
        })

    };

    const SignInBTN = ({provider,Icon})=> {
        return (
            <button 
                className="flex justify-center items-center gap-2 px-3 py-1 rounded-sm bg-emerald-200 cursor-pointer"
                onClick={()=> handle_sigin(provider)}
                >
                <Icon/>
                <span>{`sigin with ${provider}`}</span>
            </button>
        )
    }

    return (
        <div className="w-screen h-screen flex justify-center gap-2 items-center flex-col">
            <SignInBTN 
                provider='google' 
                Icon={FcGoogle} 
                />
            <SignInBTN 
                provider='github' 
                Icon={FaGithub} 
                />
        </div>
    )
}