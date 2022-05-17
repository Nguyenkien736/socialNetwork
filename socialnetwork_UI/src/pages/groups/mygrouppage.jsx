import React from "react";
import PersonIcon from '@mui/icons-material/Person';
import Topbar from '../../components/topbar/topbar'
import Leftbar from "../../components/leftbar/Leftbar";
import Feed from "../../components/feed/feed";
import Slider from "../../components/slide/slide";
import { Thread } from "../../components/thread/thread";
import { SliderData } from "../../components/slide/SliderData";
import {useState,useEffect,useContext} from 'react'
import {AuthContext} from '../../context/AuthContext'
import GroupTab from '../../components/grouptab/grouptab'
import axios from "axios";
import Addthread from '../../components/addthread/addthread'
import './mygrouppage.css'
export default function MyGroupPage()
{
    const {user} = useContext(AuthContext)
    const [groups,setGroups] = useState([])
    const [tittle,setTittle] = useState('')
    const [visibility,setVisibility]= useState(false)
    useEffect(()=>{
        const fetchGroups = async ()=>{
            const res = await axios.get('/groups/'+user._id+'/getUserGroups')
            setGroups(res.data)
        }
        fetchGroups()
        let abortController = new AbortController();  
    // your async action is here  
    return () => {  
    abortController.abort();  
    }  

    },[])

    const refetchGroups = async ()=>{
        const res = await axios.get('/groups/'+user._id+'/getUserGroups')
        setTittle('')
        setGroups(res.data)
    }
    const handleCreateGroup = async (e)=>{
        e.preventDefault()
        const res = await axios.post('/groups/creategroup',{tittle:tittle,userId:user._id})
        setVisibility(!visibility)
        refetchGroups()


    }
    useEffect(()=>{

    },[groups])
    const popupCloseHandler = (e) => {
        setVisibility(e);
      };

    return(
        <div >
            <Topbar></Topbar>
            <div className="body">
                
            <Leftbar></Leftbar>
            <div className="createButtonContainer">
            <button onClick={(e)=> setVisibility(!visibility)}>Create group</button>
            <Addthread onClose={popupCloseHandler} title='Create Group' show={visibility}>
                <div className="ButtonContainer"> 
                    <div> Tittle</div>
                <input className="GroupNameInput" type='text' placeholder="Group Name" onInput={(e)=> setTittle(e.target.value)} value ={tittle}>

                </input>



                <button onClick={handleCreateGroup}>Create</button>
                </div>


            </Addthread>
        <div>
        
            {
                groups.map((group)=>(
                    <div>
                        <GroupTab groupId={group.group_Id}></GroupTab>


                    </div>
                )

                )
            }
            </div>
            </div>
            </div>
           
            
        </div>
    )
}

// TODO: notification