
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword ,
  createUserWithEmailAndPassword
}  from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: "watsapp-clone-4428c.firebasestorage.app",
  messagingSenderId: "678825647216",
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
export const githobProvider = new GithubAuthProvider();
export const signInPassword =  new signInWithEmailAndPassword();
export const createUserWithPassword = new createUserWithEmailAndPassword()
export default  auth;
