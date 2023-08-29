import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from '../pages/Home'
import Profile from '../pages/Profile'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Header from '../components/Header'
import { Toaster } from 'react-hot-toast'
import { useContext, useEffect } from 'react'
import axios from 'axios'
import { context, server } from './main'

function App() {

  const {setUser, setIsAuthenticated, setLoading} = useContext(context);

  useEffect(() => {
    setLoading(true);
    axios.get(`${server}/users/me`,{
      withCredentials:true
    }).then(res=>{
      setUser(res.data.user);
      setIsAuthenticated(true);
      setLoading(false);
    }).catch(error=>{
      setUser({});
      setIsAuthenticated(false);
      setLoading(false);
    })
  }, [])
  

  return (
    <Router>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
      <Toaster/>
    </Router>
  )
}

export default App
