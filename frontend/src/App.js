import './App.css';
import {BrowserRouter, Routes, Route,Outlet,Navigate, useLocation} from 'react-router-dom'
import Home from "./pages/Home/Home"
import Navigation from './components/shared/Navigation/Navigation';
import Activate from './pages/Activate/Activate';
import Authenticate from './pages/Authenticate/Authenticate';
import Rooms from './pages/Rooms/Rooms';
import { useSelector } from 'react-redux';

function App() {
  return (
    <BrowserRouter>
      <Navigation></Navigation>
      <Routes>
        <Route path='/' exact element={<GuestRoute><Home /></GuestRoute>}></Route>
        <Route path='/authenticate' exact element={<GuestRoute><Authenticate /></GuestRoute>}></Route>
        <Route path='/activate' exact element={<SemiProtected><Activate /></SemiProtected>}></Route>
        <Route path='/rooms' exact element={<Protected><Rooms /></Protected>}></Route>
        
      </Routes>
    </BrowserRouter>
  );
}

const GuestRoute= ({children})=>{
  let location = useLocation()
  const authenticated = useSelector((state)=>{
    return state.auth.authenticated
  })
  return (
    <>
      {
        
        authenticated?<Navigate state={{from:location}} to='/rooms' />:children
      }
    </>
  );
}

const SemiProtected= ({children})=>{
  let location = useLocation()
  const {authenticated,user} = useSelector((state)=>{
    return state.auth
  })
  return (
    <>
      {
        !authenticated ?
        <Navigate state={{from:location}} to='/' />
        :(user.activated?
        <Navigate state={{from:location}} to='/rooms' />
        :children)
      }
    </>
  );
}

const Protected= ({children})=>{
  let location = useLocation()
  const {authenticated,user} = useSelector((state)=>{
    return state.auth
  })
  return (
    <>
      {
        !authenticated ?
        <Navigate state={{from:location}} to='/' />
        :(!user.activated?
        <Navigate state={{from:location}} to='/activate' />
        :children)
      }
    </>
  );
}

export default App;
