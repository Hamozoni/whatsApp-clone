import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Onboarding from './pages/onboarding';
import Home from './pages/home';
import Signin from './pages/signin';
import Signup from './pages/signup';
import './tailwind.css'
function App() {

  return (
        <BrowserRouter >
          <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/onboarding' element={<Onboarding />}/>
              <Route path='/signin' element={<Signin />} />
              <Route path='/signup' element={<Signup />} />
          </Routes>
        </BrowserRouter>
  )
}

export default App
