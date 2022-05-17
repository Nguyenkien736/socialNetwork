import react from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'
import './comments.css'

export default function Comment({data,deleteCb,userId}){
    const [user,setUser] = useState({})
    useEffect(()=>{
        const fetchUser = async ()=>{
            const res = await axios.get('/users/?userId='+userId)
            setUser(res.data)
        }
        fetchUser()

    },[])
    const handleDeleteComment = async ()=>{
        await axios.delete('/posts/'+data._id+'/deletecomment')
       
        deleteCb()
    }
    useEffect(()=>{

    },[user])
    return (
        <div className='Comment'>
            <span>
            <div className='userName'>{user.username}</div>
            <div className='commentbody'> {data.comment}</div>
            <button className='deleteButton' onClick={handleDeleteComment}>Delete comment</button>
            </span>
        </div>
    )
}
