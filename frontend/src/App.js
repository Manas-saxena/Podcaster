import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./pages/Home/Home"
import Navigation from './components/shared/Navigation/Navigation';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login'

function App() {
  return (
    <BrowserRouter>
      <Navigation></Navigation>
      <Routes>
        <Route path='/' exact element={<Home/>}></Route>
        <Route path='/register' exact element={<Register/>}></Route>
        <Route path='/login' exact element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
