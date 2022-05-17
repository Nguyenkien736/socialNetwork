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
import axios from 'axios'
import { useContext, useEffect, useState } from "react";
import GroupTab from '../../components/grouptab/grouptab'
export default function SearchPage({username})
{
    const {userName} =  useParams()
    const [groups,setGroups] = useState([])
    useEffect(()=>{
        const fetchGroup = async ()=>{
            const res = await axios.get('/groups/getbyname/'+userName)
            
            setGroups(res.data)
        }
        fetchGroup()
    },[])

    console.log(userName)



    return(
        <div >
            <Topbar></Topbar>
            <div className="body">
            <Leftbar></Leftbar>
            <div>
            <div>
            <div>Users</div>
            <Usertab username={userName}></Usertab>
            </div>
            <hr></hr>
            <div>
                <div>Groups</div>
                {
                    groups.map((group)=>(
                        <div>
                            <GroupTab groupId={group._id}></GroupTab>

                        </div>
                    ))
                }
            </div>

            </div>
            </div>
            
        </div>
    )
}

// TODO: notification