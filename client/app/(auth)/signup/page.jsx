"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sigin_sith_prvider } from "@/components/auth/signin_with_prodider";
import { Input } from "@/components/inputs/input";
import { Submit_btn } from "@/components/inputs/submit_btn";

export default function SignUp() {

  const [name, set_name] = useState("");
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");
  const [confirm_password, set_confirm_password] = useState("");
  const [error, set_error] = useState("");
  const [loading, set_loading] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    if (!name || !email || !password || !confirm_password) {
      set_error("All fields are required");
      return false;
    }
    if (password !== confirm_password) {
      set_error("Passwords do not match");
      return false;
    }
    if (password.length < 6) {
      set_error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    set_loading(true);
    set_error("");

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Signup failed");

      router.push("/signin");
    } catch (err) {
      set_error(err.message);
    } finally {
      set_loading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111b21] text-[#f7f8fa]">
      <div className="max-w-md w-full space-y-8 shadow-lg shadow-[#29343b77] p-3 bg-[#131e25] h-fit rounded-md md:p-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabol">
            Create a new account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <Input 
                label='Full Name' 
                type='text' 
                value={name} 
                set_value={set_name} 
                placeholder="Full Name" 
                required={true}
              />
            
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
            <Input 
                label='Confirm Password' 
                type='password' 
                value={confirm_password}
                set_value={set_confirm_password} 
                placeholder=" Confirm Password" 
                required={true}
              />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
           <Submit_btn text='sign up' is_loading={loading} /> 
        </form>
        <Sigin_sith_prvider link_to='signin'/>
      </div>
    </div>
  );
}