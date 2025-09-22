
import { useContext, useEffect, useState } from "react";
import { SiginWithPrvider } from "../components/auth/signinWithProdider";
import { Input } from "../components/ui/input";
import {createUserWithEmailAndPassword } from 'firebase/auth'
import { firebaseAuth } from "../lib/firebaseConfig";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user.context";
import { SubmitBtn } from "../components/ui/submitBtn";


export default function Signup() {

  const {user} = useContext(UserContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
     
        await createUserWithEmailAndPassword(firebaseAuth, email, password)
        .then(async({user})=> {

          const {email,photoURL,phoneNumber,emailVerified,uid} = user;

          const userIfno = {
            uid,
            email,
            displayName: name,
            photoURL,
            phoneNumber,
            emailVerified,
          }

         await axios.post(`${import.meta.VITE_API_URL}/user`,userIfno);

          navigate('/onboarding')

        })
        .catch((error)=> {
          console.log(error)
        })
      
      } catch (err) {
        setError(err.message);
        console.log(error)
      } finally {
        setLoading(false);
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
                set_value={setName} 
                placeholder="Full Name" 
                required={true}
              />
            
            <Input 
                label='Email address' 
                type='email' 
                value={email} 
                set_value={setEmail} 
                placeholder="Email address" 
                required={true}
              />
            <Input 
                label='Password' 
                type='password' 
                value={password} 
                set_value={setPassword} 
                placeholder="Password" 
                required={true}
              />
            <Input 
                label='Confirm Password' 
                type='password' 
                value={confirmPassword}
                set_value={setConfirmPassword} 
                placeholder=" Confirm Password" 
                required={true}
              />

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
           <SubmitBtn text='sign up' isLoading={loading} /> 
        </form>
        <SiginWithPrvider link_to='signin'/>
      </div>
    </div>
  );
}