import React from "react";
import PersonIcon from '@mui/icons-material/Person';
import Topbar from '../../components/topbar/topbar'
import Leftbar from "../../components/leftbar/Leftbar";
import Feed from "../../components/feed/feed";
import Slider from "../../components/slide/slide";
import { Thread } from "../../components/thread/thread";
import { SliderData } from "../../components/slide/SliderData";
import GroupFeed from '../../components/groupfeed/groupfeed'
import {useParams} from 'react-router-dom'
import {useContext, useEffect,useState} from 'react'
import {AuthContext} from '../../context/AuthContext'
import axios from 'axios'
import Addthread from "../../components/addthread/addthread";
export default function GroupPage()
{
    const {user} = useContext(AuthContext)
    const {groupId} = useParams()
    const [threadtittle,setThreadtittle] = useState('')
    const [resetFlag,setResetFlag] = useState(false)
    const [visibility,setVisibility] = useState(false)
    useEffect(()=>{
        
        let abortController = new AbortController();  
    // your async action is here  
    return () => {  
    abortController.abort();  
    }  
        

    },[resetFlag])
    const handleAddGroupThread = async ()=>{
        const res = await axios.post(`/groups/${groupId}/addthreadtogroup`,{tittle:threadtittle,userId:user._id})
        setResetFlag(!resetFlag)
        setVisibility(!visibility)
        setThreadtittle('')
    }
    const popupCloseHandler = (e)=>
    {
        setVisibility(e)
    }
    return(
        <div >
            <Topbar></Topbar>
            <div className="body">
            <Leftbar></Leftbar>
            <div>
            <button onClick={(e)=> setVisibility(!visibility)}>add thread</button>

            <GroupFeed groupid={groupId} refreshFlag={resetFlag} ></GroupFeed>
            
            <Addthread show={visibility} onClose={popupCloseHandler} title='Add thread'>
                <div>thread tittle</div>
                <input value={threadtittle} onInput={(e)=> setThreadtittle(e.target.value)}></input>
                <button onClick={handleAddGroupThread}>add</button>
            </Addthread>
            
            </div>
            </div>
            
        </div>
    )
}

// TODO: notification