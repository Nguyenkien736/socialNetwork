import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {useEffect,useState} from 'react'
import './usertab.css'
export default function Usertab({username,userId}){
    const [currentUser,setCurrentUser]= useState({})
    useEffect(()=>{
        const fetchUserByUsername = async (username)=>
            {
                const res= await axios.get('/users/?username='+username)
                setCurrentUser(res.data)

            }

        const fetchUserByUserId = async (userid)=>
            {
                const res= await axios.get('/users/?userId='+userid)
                setCurrentUser(res.data)

            }
        
        
        if(username)
        fetchUserByUsername(username)
        if(userId) fetchUserByUserId(userId)

    },[])
    

    return (
        <div className='tabBody'>
             <img className="avatar" src= {
              currentUser.profile_picture ?
              `http://localhost:8800/images/${currentUser.profile_picture}`
              :   `http://localhost:8800/images/noprofilepic.png`

            } ></img>
            <Link to = {"/profile/"+currentUser.username} >{currentUser.username}</Link>

        </div>

        

    )

}