
import { useContext, useEffect, useState } from "react";
import { Sigin_sith_prvider } from "../components/auth/signin_with_prodider";
import { Input } from "../components/ui/input";
import { Submit_btn } from "../components/ui/submit_btn";
import {createUserWithEmailAndPassword,updateProfile } from 'firebase/auth'
import { firebase_auth } from "../lib/firebase_config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User_context } from "../contexts/user.context";

export default function Signup() {
  const {user} = useContext(User_context)
  const [name, set_name] = useState("");
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");
  const [confirm_password, set_confirm_password] = useState("");
  const [error, set_error] = useState("");
  const [loading, set_loading] = useState(false);
  const navigate = useNavigate();

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
    set_error(null);

    try {
     
        await createUserWithEmailAndPassword(firebase_auth, email, password)
        .then(async({user})=> {

          const {email,photoURL,phoneNumber,emailVerified,uid} = user;

          const user_data = {
            uid,
            email,
            displayName: name,
            photoURL,
            phoneNumber,
            emailVerified,
          }

         await axios.post(`${import.meta.VITE_API_URL}/user`,user_data);

          navigate('/onboarding')

        })
        .catch((error)=> {
          console.log(error)
        })
      
      } catch (err) {
        set_error(err.message);
        console.log(error)
      } finally {
        set_loading(false);
      }
  };

      useEffect(()=> {
        if(user){
          navigate('/');
        }
      },[user])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111b21] text-[#f7f8fa]">
      <div className="max-w-md w-full space-y-8 shadow-lg shadow-[#29343b77] p-3 bg-[#131e25] h-fit rounded-md md:p-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabol">
            Create a new account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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