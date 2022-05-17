// render a particular thread

import React from "react";
import PersonIcon from '@mui/icons-material/Person';
import Topbar from '../../components/topbar/topbar'
import Leftbar from "../../components/leftbar/Leftbar";
import Feed from "../../components/feed/feed";
import './threads.css'
import Slider from "../../components/slide/slide";
import { Thread } from "../../components/thread/thread";
import { SliderData } from "../../components/slide/SliderData";
import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import axios from 'axios'
export default function Threapage()
{
    const {threadId} = useParams()
    const [thread,setThread] = useState({})
   
   
    useEffect(()=>{
        const fetchThread = async ()=>{
            const res = await axios.get(`/threads/${threadId}`)
            
            setThread(res.data)
            
        }
        fetchThread()

        
    },[])
    useEffect(()=>{

    },[thread])

    const resetThread = async ()=>{
        const res = await axios.get(`/threads/${threadId}`)
            
        setThread(res.data)
        
    }

    
    return(
        <div >
            <Topbar></Topbar>
            <div className="body">
            <Leftbar></Leftbar>
            {
                thread ? (
                    < Thread data={thread} deleteCallback={resetThread}></Thread>
                ) : (
                    <Navigate to={'/'}></Navigate>

                )
            }
            
            
           

            
            </div>
            
        </div>
    )
}

// TODO: notification