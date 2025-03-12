"use client";
import { useState } from "react";

import { Sigin_sith_prvider } from "@/components/auth/signin_with_prodider";
import { Input } from "@/components/inputs/input";
import { Submit_btn } from "@/components/inputs/submit_btn";

export default function SignIn() {
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");
  const [is_loading, set_is_loading] = useState(false);
  const [error, setError] = useState("");


  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-md w-full space-y-8 shadow p-3">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-4" >
          <div className="">
            <Input label='Email address' type='email' value={email} set_value={set_email} placeholder="Email address" required={true}/>
            <Input label='Password' type='password' value={password} set_value={set_password} placeholder="Password" required={true}/>
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