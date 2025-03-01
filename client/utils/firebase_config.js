
import { initializeApp } from "firebase/app";
import { getAuth }  from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCcP3nc-Q3mqwZfz4UD09BilY1rfUr_qzg",
  authDomain: "watsapp-clone-4428c.firebaseapp.com",
  projectId: "watsapp-clone-4428c",
  storageBucket: "watsapp-clone-4428c.firebasestorage.app",
  messagingSenderId: "678825647216",
  appId: "1:678825647216:web:5f70e47a489ab3048d28b5",
  measurementId: "G-LYJ70F1YZF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebase_auth = getAuth(app)
