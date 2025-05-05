import './App.css';

import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Onboarding from './pages/onboarding';
import Home from './pages/home';
import Signin from './pages/signin';
import Signup from './pages/signup';
import { User_context_provider } from './contexts/user.context';
import {Chat_window_context_provider} from './contexts/chat_window.context';
import {Call_context_provider} from './contexts/call.context';

function App() {

  return (
    <User_context_provider >
      <Chat_window_context_provider >
        <Call_context_provider >
          <BrowserRouter >
            <Routes>
                <Route  path='/' element={<Home />}/>
                <Route path='/onboarding' element={<Onboarding />}/>
                <Route path='/signin' element={<Signin />} />
                <Route path='/signup' element={<Signup />} />
            </Routes>
          </BrowserRouter>
        </Call_context_provider>
      </Chat_window_context_provider>
    </User_context_provider>
  )
}

export default App
