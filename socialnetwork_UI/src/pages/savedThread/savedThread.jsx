import React from "react";
import PersonIcon from '@mui/icons-material/Person';
import Topbar from '../../components/topbar/topbar'
import Leftbar from "../../components/leftbar/Leftbar";
import Feed from "../../components/feed/feed";
import Slider from "../../components/slide/slide";
import { Thread } from "../../components/thread/thread";
import { SliderData } from "../../components/slide/SliderData";
import Usertab from "../../components/usertab/usertab";
import {useParams} from 'react-router-dom'
import {useEffect, useState, useContext} from 'react'
import {AuthContext} from '../../context/AuthContext'
import ThreadWrapper from '../../components/threadwrapper/threadwrapper'
import axios from 'axios'
export default function SavedThreadPage({username})
{
    const {user} = useContext(AuthContext)
    const [savedThreads, setSavedThreads ] =useState([])
    const [threads, setThreads ] =useState([])
    useEffect(()=>{
        const fetchSavedThreads = async ()=>{
            const res = await axios.get('/threads/'+user._id+'/getsavedthread')
            
            

            setSavedThreads(res.data)
            

        }
        fetchSavedThreads()

    },[])

    useEffect(()=>{

    },[savedThreads])

    const resetthreads = async ()=>{
        const res = await axios.get('/threads/'+user._id+'/getsavedthread')
        console.log(res.data)
        setSavedThreads(res.data)
    }
    const unsavedReset =async ()=>{
        const res = await axios.get('/threads/'+user._id+'/getsavedthread')
        setSavedThreads(res.data)
    }
   



    return(
        <div >
            <Topbar></Topbar>
            <div className="body">
                
            <Leftbar></Leftbar>
            <div className="threads">
            {
                
                savedThreads.map((element)=>(
                    
                    <ThreadWrapper threadId={element.thread_id} dlCb={resetthreads} usCb={unsavedReset}></ThreadWrapper>
                    
                )
                    
                )
            }
            </div>
            
            </div>
            
        </div>
    )
}

// TODO: notification