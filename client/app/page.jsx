'use client'
import { Auth_context } from '@/components/auth/context';
import {firebase_auth} from '@/lib/firebase_config'
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

export default function Home() {


  const { user} = useContext(Auth_context);

const router = useRouter();

useEffect(()=> {

  
  const user = firebase_auth.currentUser
  if(!user) {
    router.push('/signin');
  }
  console.log(user);
},[]);

  return (
     <div className="">
       <h1>home</h1>
       <button
        onClick={()=> signOut(firebase_auth)}
       >sign out</button>
    </div>
  );
}
