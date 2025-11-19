
import {useState } from "react";

import { SiginWithPrvider } from "../components/signinWithProdider";
import { Input } from "../../../components/ui/input";
import {createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../../../lib";
import { useNavigate } from "react-router-dom";
import { SubmitBtn } from "../../../components/ui/submitBtn";


export default function Signup() {
  
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
     
        await createUserWithEmailAndPassword(auth, email, password);
         navigate('/chats');
      
      } catch (err) {
        setError(err.message);
        console.log(error)
      } finally {
        setLoading(false);
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
        <SiginWithPrvider link_to='/auth/signin'/>
      </div>
    </div>
  );
}