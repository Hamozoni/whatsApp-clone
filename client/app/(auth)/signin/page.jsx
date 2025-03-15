"use client";
import { useState } from "react";

import { Sigin_sith_prvider } from "@/component/auth/signin_with_prodider";
import { Input } from "@/component/inputs/input";
import { Submit_btn } from "@/component/inputs/submit_btn";
import {signInWithEmailAndPassword} from 'firebase/auth'
import { firebase_auth } from "@/lib/firebase_config";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");
  const [is_loading, set_is_loading] = useState(false);
  const [error, set_error] = useState("");

  const router = useRouter();

  const handle_submit = async(e)=> {
    e.preventDefault();
    set_is_loading(true);
    try {
      await signInWithEmailAndPassword(firebase_auth,email,password)
      .then(_=> {
        set_is_loading(false);
        router.push('/');
      })
    }
    catch (error) {
      set_error(error?.message);
      set_is_loading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111b21] text-[#f7f8fa] p-3">
      <div className="max-w-md w-full space-y-8 shadow-lg shadow-[#29343b77] p-3 bg-[#131e25] h-fit rounded-md md:p-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold">
            Sign in to your account
          </h2>
        </div>
        <form onSubmit={handle_submit} className="mt-8 space-y-5" >
          <div className="flex flex-col gap-4">
            <Input 
                label='Email address' 
                type='email' 
                value={email} 
                set_value={set_email} 
                placeholder="Email address" 
                required={true}
                />
            <Input 
                label='Password' 
                type='password' 
                value={password} 
                set_value={set_password} 
                placeholder="Password" 
                required={true}
              />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <Submit_btn text='sign in' is_loading={is_loading} />
        </form>
        <Sigin_sith_prvider link_to='signup' />
      </div>
    </div>
  );
}