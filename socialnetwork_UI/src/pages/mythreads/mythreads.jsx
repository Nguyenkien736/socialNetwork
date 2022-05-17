// take data and render all user thread

import React from "react";
import PersonIcon from '@mui/icons-material/Person';
import Topbar from '../../components/topbar/topbar'
import Leftbar from "../../components/leftbar/Leftbar";
import Feed from "../../components/feed/feed";
import './mythread.css'
import Slider from "../../components/slide/slide";
import { Thread } from "../../components/thread/thread";
import { SliderData } from "../../components/slide/SliderData";
import { useContext,useEffect,useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios'
export default function Mythreads()
{
    const {user}= useContext(AuthContext)
    const [threads,setThreads] =useState([])


    useEffect(()=>{
        const fetchPost=async () => {
            const res = await axios.get(`/threads/${user._id}/getallthread`)
            setThreads(res.data)

        }
        

        fetchPost()
    },[user._id])
    useEffect(()=>{

    },[threads])
    const resetthreads = async ()=>{
        const res = await axios.get(`/threads/${user._id}/getallthread`)
        setThreads(res.data)

    }






   

    return(
        <div >

            <Topbar></Topbar>
            <div className="body">
            <Leftbar></Leftbar>
            <div className="Threads">
            {
                threads.map((thread)=>(
                    
                    <Thread data={thread} deleteCallback={resetthreads}></Thread>
              
                    
                )
                    

                )
            }
            </div>
            </div>

            
        </div>
    )
}

// TODO: notification