import {BrowserRouter,Routes,Route} from 'react-router-dom';

import {
    Signin,
    Signup,
    Chats,
    Calls,
    Status,
    Channels,
    Settings,
    Profile 
} from './pages/index';

import {
    StatusPostImage,
    StatusPostText,
    StatusPostVideo
} from "./pages/status/post/index";

import { Navbar } from './components/navbar/navbar';
import { 
    UserContextProvider,
    SettingsContextProvider,
    CallContextProvider,
    ChatsContextProvider 
} from './contexts/index';

import {
    Account,
    Chats as ChatSetting,
    Help ,
    MainSetting,
    Notifications,
    Privacy,
    Theme
} from "./pages/settings/outlets/index";
import StatusPreview from './pages/status/preivew/statusPreview';

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
                                    <Route path='/chats' index  element={<Chats />} />
                                    <Route path='/chats/:contactId'  element={<Chats />} />
                                    <Route path='/calls' element={<Calls />} />
                                    <Route path='/status' element={<Status />} />
                                    <Route path='/status/postVideo' element={<StatusPostVideo />} />
                                    <Route path='/status/postImage' element={<StatusPostImage />} />
                                    <Route path='/status/postText' element={<StatusPostText />} />
                                    <Route path='/status/preview' element={<StatusPreview />} />
                                    <Route path='/status' element={<Status />} />
                                    <Route path='/channels' element={<Channels />} />
                                    <Route path='/settings' element={Settings} >
                                        <Route index element={MainSetting} />
                                        <Route path='acount' element={Account} />
                                        <Route path='chat' element={ChatSetting} />
                                        <Route path='help' element={Help} />
                                        <Route path='notification' element={Notifications} />
                                        <Route path='privacy' element={Privacy} />
                                        <Route path='theme' element={Theme} />
                                    </Route>
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
