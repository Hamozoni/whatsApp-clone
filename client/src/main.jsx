import './index.css';
import { createRoot } from 'react-dom/client';
import { 
    UserContextProvider,
    SettingsContextProvider,
    CallContextProvider,
    ChatsContextProvider 
} from './contexts/index';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(

    <UserContextProvider>
        <SettingsContextProvider>
             <CallContextProvider >
                <ChatsContextProvider >

                    <App /> 
                </ChatsContextProvider>
             </CallContextProvider>
        </SettingsContextProvider>
    </UserContextProvider>

); 
