import {firebase_auth} from '@/lib/firebase_config'
import { signOut } from 'firebase/auth';
export const Setting = ()=> {
    return (
        <div className="">
            <button onClick={()=> signOut(firebase_auth)}>sign out</button>
        </div>
    )
}