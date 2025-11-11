import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {Signin,Signup,Chats,Calls,Status,Channels,Settings,Profile } from './pages/index';

import { Navbar } from './components/navbar/navbar';
import { 
    UserContextProvider,
    SettingsContextProvider,
    CallContextProvider,
    ChatsContextProvider 
} from './contexts/index';

function App() {
  
  return (
        <BrowserRouter >
            <UserContextProvider >
                <SettingsContextProvider>
                     <ChatsContextProvider>
                        <CallContextProvider >
                            <main className="flex flex-col gap-1 md:flex-row h-screen max-h-screen w-screen max-w-screen text-amber-50">
                                <Navbar />
                                <Routes>
                                    <Route path='/'  element={<Chats />} />
                                    <Route path='/chats'  element={<Chats />} />
                                    <Route path='/chats/:contactId'  element={<Chats />} />
                                    <Route path='/calls' element={<Calls />} />
                                    <Route path='/status' element={<Status />} />
                                    <Route path='/channels' element={<Channels />} />
                                    <Route path='/settings' element={<Settings />} />
                                    <Route path='/profile' element={<Profile />} />
                                    <Route path='/signin' element={<Signin />} />
                                    <Route path='/signup' element={<Signup />} />
                                </Routes>
                            </main>
                          </CallContextProvider>
                     </ChatsContextProvider>
                  </SettingsContextProvider>
              </UserContextProvider>
        </BrowserRouter>
  );
};

export default App;
