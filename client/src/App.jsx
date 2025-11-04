import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signin from './pages/signin';
import Signup from './pages/signup';
import { Chats } from './pages/chats';
import { Calls } from './pages/calls';
import { Status } from './pages/status';
import { Channels } from './pages/channels';
import { Settings } from './pages/settings';
import { Profile } from './pages/profile';
import { Navbar } from './components/navbar/navbar';
import { UserContextProvider } from './contexts/user.context';
import { SettingsContextProvider } from './contexts/settings.context';
import { CallContextProvider } from './contexts/call.context';
import { ChatsContextProvider } from './contexts/chats.context';

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
