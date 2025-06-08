import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { User_context_provider } from './contexts/user.context.jsx'
import { Call_context_provider } from './contexts/call.context.jsx'
import { ChatsContextProvider } from './contexts/chats.context.jsx';

createRoot(document.getElementById('root')).render(
    <User_context_provider >
      <ChatsContextProvider >
          <Call_context_provider >
              <App />
          </Call_context_provider>
        </ChatsContextProvider>
    </User_context_provider>
)
