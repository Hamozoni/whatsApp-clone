"use client"
import Link from "next/link";
import {GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { firebase_auth } from "@/lib/firebase_config";
import { useRouter } from "next/navigation";
import { useState } from "react";


export function Sigin_sith_prvider ({link_to}) {

    const [isLoading,setIsLoading] = useState(false);

    const router = useRouter()

    const handle_sigin = async (provider)=> {
        setIsLoading(true)
      const auth_provider = provider === 'GitHub' ? new GithubAuthProvider() : new GoogleAuthProvider();
       try {
          await signInWithPopup(firebase_auth,auth_provider)
          .then(async({user})=> {
            console.log(user);
            setIsLoading(false);
            router.push('/');

          })
       } catch(err) {
        console.log(err)
       }

    }


    return (

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-blue-50 text-gray-700">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div>
              <button
                disabled={isLoading}
                onClick={()=> handle_sigin('Google')}
                className="w-full cursor-pointer flex justify-center items-center gap-3 py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <FcGoogle size={20} />
                <h5 className="">Google</h5>
              </button>
            </div>

            <div>
              <button
                 disabled={isLoading}
                 onClick={()=> handle_sigin('GitHub')}
                className="w-full cursor-pointer flex justify-center items-center gap-3 py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <FaGithub size={20} />
                <h5 className="">GitHub</h5>
              </button>
            </div>
          </div>
          <div className="text-center mt-3">
            <p className="text-sm text-gray-600">
              { link_to === 'signup' ? 'do not': ''} have an account?{" "}
              <Link
                href={`/${link_to}`}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                {link_to === 'signin' ?  'Sign in here' : 'Sign up here'}
              </Link>
            </p>
          </div>
        </div>
    )
}