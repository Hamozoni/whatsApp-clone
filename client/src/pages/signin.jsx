import { useContext, useEffect, useState } from "react";

import { Input } from "../components/ui/input";
import {signInWithEmailAndPassword} from 'firebase/auth'
import { firebaseAuth } from "../lib/firebaseConfig";
import {useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user.context";
import { SubmitBtn } from "../components/ui/submitBtn";
import {SiginWithPrvider} from "../components/auth/signinWithProdider"

export default function Signin() {

  const [email, set_email] = useState("");
  const [password, set_password] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {user} = useContext(UserContext)

  const navigate = useNavigate();

  const handleSubmit = async(e)=> {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(firebaseAuth,email,password)
      .then(()=> {
        setIsLoading(false);
        navigate('/');
      })
    }
    catch (error) {
      setError(error?.message);
      setIsLoading(false);
    }
  };

    useEffect(()=> {
      if(user){
        navigate('/');
      }
    },[user])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111b21] text-[#f7f8fa] p-3">
      <div className="max-w-md w-full space-y-8 shadow-lg shadow-[#29343b77] p-3 bg-[#131e25] h-fit rounded-md md:p-8">
        <div>
          <h1 className="text-center text-5xl font-extrabold">
             WhatsApp
          </h1>
          <h2 className="mt-6 text-center text-3xl font-extrabold">
            Sign in to your account
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5" >
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

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <SubmitBtn text='sign in' isLoading={isLoading} />
        </form>
        <SiginWithPrvider link_to='signup' />
      </div>
    </div>
  );
}