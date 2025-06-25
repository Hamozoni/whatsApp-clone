import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { UserContextProvider } from './contexts/user.context.jsx';
import {CallContextProvider } from './contexts/call.context.jsx';
import { ChatsContextProvider } from './contexts/chats.context.jsx';
import {SettingsContextProvider} from './contexts/settings.context.jsx';

createRoot(document.getElementById('root')).render(
    <UserContextProvider >
        <SettingsContextProvider>
            <ChatsContextProvider >
                <CallContextProvider >
                    <App />
                </CallContextProvider>
            </ChatsContextProvider>
        </SettingsContextProvider>
    </UserContextProvider>
);
