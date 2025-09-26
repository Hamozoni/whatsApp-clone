import { Chats } from './chats';
import {Calls} from './calls'
import {Channels } from './channels';
import { Navbar } from '../components/navbar/navbar';
import { Profile } from './profile';
import { Settings } from './settings';
import { Status } from './status';
import { UserContext } from '../contexts/user.context';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {

  const {user,activeNavbar} = useContext(UserContext);


  const navigate = useNavigate();

  useEffect(()=> {
    if(!user){
      navigate('signin');
      return;
    }
  },[user])

  return (

      <div className="flex flex-col gap-1 md:flex-row h-screen max-h-screen w-screen max-w-screen">
          <Navbar />
          <div className="flex-1 overflow-y-auto text-[#f7f8fa]">
            {
              activeNavbar === 'chats' ? 
                <Chats />:
              activeNavbar === 'calls' ? 
                <Calls /> : 
              activeNavbar === 'status' ? 
                <Status /> :
              activeNavbar === 'channels' ?
                <Channels /> : 
              activeNavbar === 'settings' ?
                <Settings /> : 
              activeNavbar === 'profile' &&
                <Profile />
            }

          </div>
      </div>
  );
}