import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { context, server } from '../src/main';
import { toast } from 'react-hot-toast';
import Todoiteams from '../components/Todoiteams';
import { Navigate } from 'react-router-dom';

const Home = () => {
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [loading,setLoading] = useState(false);
  const [task,setTask] = useState([]);
  const [refresh,setRefresh] = useState(false);

  const {isAuthenticated} = useContext(context);


  const submitHandler = async(e) =>{
    e.preventDefault();
    try {
      setLoading(true);
      const {data} = await axios.post(`${server}/task/new`,{
        title,
        description
      },{
        withCredentials:true
      })
      toast.success(data.message);
      setLoading(false);
      setDescription("");
      setTitle("");
      setRefresh(prev=>!prev);
    } 
    catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }


  useEffect(() => {
    axios.get(`${server}/task/my`,{
      withCredentials:true
    }).then(res=>{
      setTask(res.data.task);
    }).catch(error=>{
      // toast.error(error.response.data.message);
    })
  }, [refresh])



  const updateHandler = async(id) =>{
    try {
        const {data} = await axios.put(`${server}/task/${id}`,{},{
            withCredentials:true
        })

        toast.success(data.message);
        setRefresh(prev=>!prev);
    }
    catch (error) {
        toast.error(error.response.data.message);
    }
    
}



const DeleteHandler = async(id) =>{
    try {
        const {data} = await axios.delete(`${server}/task/${id}`,{
            withCredentials:true
        })

        toast.success(data.message);
        setRefresh(prev=>!prev);
    }
    catch (error) {
        toast.error(error.response.data.message);
    }
    
}
  
if(!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <div className='container'>
      <div className='login'>
        <section>
          <form onSubmit={submitHandler}>
              <input type='text' placeholder='Title' required value={title} onChange={(e)=>setTitle(e.target.value)} />
              <input type='text' placeholder='Description' required value={description} onChange={(e)=>setDescription(e.target.value)} />
              <button type='submit' disabled={loading} >Add Task</button>
            </form>
          </section>
        </div>
      <section className='todosContainer'>
        {
          task.map(i=>(
            <Todoiteams title={i.title} description={i.description} isCompleted={i.isCompleted} id={i._id} key={i._id} 
            updateHandler={updateHandler} DeleteHandler={DeleteHandler} />
          ))
        }
      </section>
    </div>
  )
}

export default Home