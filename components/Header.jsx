import React, { useContext } from 'react'
import { Link} from 'react-router-dom'
import { context, server } from '../src/main'
import { toast } from 'react-hot-toast'
import axios from 'axios'


const Header = () => {
  const {isAuthenticated,setIsAuthenticated,loading, setLoading} = useContext(context);

  const logouHandler = async() =>{
    setLoading(true);
    try {
      await axios.get(`${server}/users/logout`,
      {
        withCredentials:true
      })
      toast.success("Logout successfully");
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      toast.error("Error occured during logout");
      setIsAuthenticated(true);
      setLoading(false);
    }
  }


  return (
    <nav className='header'>
        <div>
            <h2>TODO APP</h2>
        </div>
        <article>
            <Link to={"/"} >Home</Link>
            <Link to={"/Profile"} >Profile</Link>
            {
              isAuthenticated ? (<button className='btn' disabled={loading} onClick={logouHandler}>Logout</button>) : (<Link to={"/login"} >Login</Link>)
            }
        </article>
    </nav>
  )
}

export default Header