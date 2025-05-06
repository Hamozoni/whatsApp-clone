import { useContext } from 'react';
import {firebase_auth} from '../../lib/firebase_config'
import { signOut } from 'firebase/auth';
import { User_context } from '../../contexts/user.context';

export const Setting = ()=> {

    const {set_user} = useContext(User_context);

    const signout = async ()=> {
       await signOut(firebase_auth);
       set_user(null)
    };

    return (
        <div className="">
            <button onClick={signout}>sign out</button>
        </div>
    )
}