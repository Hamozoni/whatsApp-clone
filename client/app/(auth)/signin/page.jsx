"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { firebase_auth } from "@/lib/firebase_config";
import axios from "axios";
import { Sigin_sith_prvider } from "@/components/auth/signin_with_prodider";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
//   const { data: session } = useSession();

//   if (session) {
//     router.push("/");
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     const result = await signIn("credentials", {
//       redirect: false,
//       email,
//       password,
//     });

//     if (result?.error) {
//       setError(result.error);
//       setLoading(false);
//     } else {
//       router.push("/");
//     }
//   };

//     const handle_sigin =  async(provider)=> {
//         console.log(provider)
//         const auth_provider = provider === 'google' ? new GoogleAuthProvider() : new GithubAuthProvider();
//         await signInWithPopup(firebase_auth,auth_provider)
//         .then(async({user})=> {
//             console.log(user)

//             const {email, displayName: user_name,photoURL: profile_image_url} = user;
//             try {
//                 if(email) {
    
//                     const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/find_user`,{email})
    
//                     console.log(data)
    
//                 }
//             }
//             catch (error){
//                 console.log(error)
//             }
//         })
//         .catch((error)=> {
//             console.log(error)
//         })

//     };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" >
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
        <Sigin_sith_prvider link_to='signup' />
      </div>
    </div>
  );
}