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
import {useEffect, useState, useContext} from 'react'
import {AuthContext} from '../../context/AuthContext'
import MemberWrapper from '../../components/memberwrapper/memberwrapper'
import RequestWrapper from "../../components/requestwrapper/requestwrapper";
import axios from "axios";
export default function AdminGroupPage()
{
    const {user} = useContext(AuthContext)

    const {groupId} = useParams()
    const [group,setGroup] = useState({})
    const [members,setMembers] = useState([])
    const [requests,setRequests] = useState([])

    useEffect(()=>{
        const fetchInfomation = async ()=>{
            const res = await axios.get('/groups/'+groupId+'/getmembers')
            setMembers(res.data)
            const res1 = await axios.get('/groups/'+groupId+'/getrequestmembers')
            setRequests(res1.data)
            const res2 = await axios.get('/groups/'+groupId)
            setGroup(res2.data)
        }
        fetchInfomation()


    },[])
    // fetch members
    // fetch request
    //
    return(
        
        <div >
            <Topbar></Topbar>
            <div className="body">
            <Leftbar></Leftbar>
            <div>
                member list
                {
                    members.map((member)=>(
                        <div>
                            <MemberWrapper memberId={member.User_Id} groupId={member.group_Id}></MemberWrapper>

                        </div>
                    ))
                }
            </div>
            <div>
                request list
                {
                    requests.map((request)=>(
                        <div>
                            <RequestWrapper requestMemberId={request.User_Id} groupId={request.group_Id}></RequestWrapper>

                        </div>
                    ))
                }
            </div>
            
            
            </div>
            
        </div>
       
    )
}

// TODO: notification