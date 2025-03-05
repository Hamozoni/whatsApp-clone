'use client'
import {firebase_auth} from '@/lib/firebase_config'
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {

const router = useRouter()

useEffect(()=> {
  firebase_auth.onAuthStateChanged((user)=>{

    console.log(user)
    if(!user) {
      router.push('/signin');
    }
  })
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
