import Home from "./pages/Home/Home"
import {Routes, Route, useNavigate} from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from "./pages/Player/Player"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { auth } from "./firebase"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Search from './pages/Search/Search';

const App = () => {

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async(user) => {
      if(user) {
        console.log("Logged In");
        navigate('/');
      } else {
        console.log("Logout Out");
        navigate('/login');
      }
    })
  },[]);

  return (
    <div>
      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
        <Route path="/search/:query" element={<Search />} />
        <Route
          path="*"
          element={<div>404 - Page Not Found</div>}
        />
      </Routes>
    </div>
  )
}

export default App
