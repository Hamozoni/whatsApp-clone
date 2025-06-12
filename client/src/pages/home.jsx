import { Chats } from './chats';
import {Calls} from './calls'
import {Channels } from './channels';
import { Navbar } from '../components/navbar/navbar';
import { Profile } from './profile';
import { Settings } from './settings';
import { Status } from './status';
import { User_context } from '../contexts/user.context';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {

  const {user,active_navbar} = useContext(User_context);


  const navigate = useNavigate();

  useEffect(()=> {
    if(!user){
      navigate('signin');
      return;
    }
  },[user])

  return (

      <div className="md:flex h-dvh max-h-svh w-dvw max-w-dvw">
          <Navbar />
          <div className="w-full text-[#f7f8fa] max-h-dvh rounded-lg m-1 ml-0">
            {
              active_navbar === 'chats' ? 
                <Chats />:
              active_navbar === 'calls' ? 
                <Calls /> : 
              active_navbar === 'status' ? 
                <Status /> :
              active_navbar === 'channels' ?
                <Channels /> : 
              active_navbar === 'settings' ?
                <Settings /> : 
              active_navbar === 'profile' &&
                <Profile />
            }

          </div>
      </div>
  );
}