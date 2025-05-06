import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './tailwind.css'
import './index.css'
import App from './App.jsx';
import { User_context_provider } from './contexts/user.context.jsx'
import { Chat_window_context_provider } from './contexts/chat_window.context.jsx'
import { Call_context_provider } from './contexts/call.context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <User_context_provider >
      <Chat_window_context_provider >
          <Call_context_provider >
            <App />
          </Call_context_provider>
        </Chat_window_context_provider>
    </User_context_provider>
  </StrictMode>

)
