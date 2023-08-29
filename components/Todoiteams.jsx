import axios from 'axios'
import React from 'react'
import { toast } from 'react-hot-toast'
import { server } from '../src/main'



const Todoiteams = ({title,description, isCompleted, id, updateHandler, DeleteHandler}) => {

  return (
    <div className='todo'>
        <div>
            <h4>{title}</h4>
            <p>{description}</p>
        </div>
        <div>
            <input onChange={()=>updateHandler(id)} type='checkbox' checked={isCompleted} />
            <button className='btn' onClick={()=>DeleteHandler(id)}>Delete</button>
        </div>
    </div>
  )
}

export default Todoiteams