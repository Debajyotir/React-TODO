import React, { useContext, useEffect } from 'react'
import { context, server } from '../src/main';
import Loader from '../components/Loader';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const {isAuthenticated,loading,user, setUser} = useContext(context);


  useEffect(() => {
    axios.get(`${server}/users/me`,{
      withCredentials:true
    }).then(res=>{
      setUser(res.data.user);
    }).catch(error=>{
      setUser({});
    })
  }, [])


  if(!isAuthenticated) return <Navigate to={"/login"} />;
  return (
      loading ? <Loader/> : (
      <div>
        <h1>{user?.name}</h1>
        <p>{user?.email}</p>
      </div>)
  )
}

export default Profile