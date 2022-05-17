import React from "react";
import  Post  from "../post/post";
import Slider from "../slide/slide";
import { SliderData } from "../slide/SliderData";

import axios from 'axios'
import Addthread from '../addthread/addthread'

import {useState, useEffect,useContext} from 'react'
import {AuthContext} from '../../context/AuthContext'
import {Thread} from '../thread/thread'

export default function GroupThreadWrapper({threadId,dlCb,usCb}){
    const {user} = useContext(AuthContext)
    const [thread,setThread] = useState({})
    useEffect(()=>{
        let isMounted = true
        const fetchThread = async ()=>{
            
            const res =await axios.get('/threads/'+threadId)
            setThread(res.data)
        }
            
        fetchThread()
        let abortController = new AbortController();  
    // your async action is here  
    return () => {  
    abortController.abort();  
    }  

    },[])
    useEffect(()=>{

    },[threadId])

    
    return(
        <div>
            {console.log(thread)}
            <Thread data={thread} deleteCallback={dlCb}>
                

            </Thread>
            
        </div>
    )
        


}