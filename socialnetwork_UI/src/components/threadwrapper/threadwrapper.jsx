import React from "react";
import  Post  from "../post/post";
import Slider from "../slide/slide";
import { SliderData } from "../slide/SliderData";

import axios from 'axios'
import Addthread from '../addthread/addthread'
import './threadwrapper.css'
import {useState, useEffect,useContext} from 'react'
import {AuthContext} from '../../context/AuthContext'
import {Thread} from '../thread/thread'
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';

export default function ThreadWrapper({threadId,dlCb,usCb}){
    const {user} = useContext(AuthContext)
    const [thread,setThread] = useState({})
    useEffect(()=>{
        const fetchThread = async ()=>{
            const res =await axios.get('/threads/'+threadId)

            setThread(res.data)
        }
        fetchThread()


    },[])
    useEffect(()=>{

    },[threadId])

    let unsaveHandler = async ()=>{
        const res = await axios.post('/threads/'+threadId+'/unsavethread',{userId:user._id})

        usCb()
    }
    return(
        <div className="threadWrapper">
            <Thread data={thread} deleteCallback={dlCb}>
                

            </Thread>
            <button className='unsavebutton' onClick={unsaveHandler}><BookmarkRemoveIcon></BookmarkRemoveIcon></button>
        </div>
    )
        


}