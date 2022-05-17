import React from 'react'
import Topbar from '../../components/topbar/topbar'
import Leftbar from '../../components/leftbar/Leftbar'
import {useEffect,useContext,useState} from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import Usertab from '../../components/usertab/usertab'


export default function FollowersPage()
{
    const [followers,setFollowers] = useState([]) 
    const {user} =useContext(AuthContext)
    useEffect(()=>{

        const fetchFollowers = async ()=>{
            const res = await axios.get(`/users/${user._id}/getfollower`) 
            setFollowers(res.data)
        }
        fetchFollowers()

    },[])


    return (
        <div>
            <Topbar></Topbar>
            <div className="body">
            <Leftbar></Leftbar>
            {
                followers.map((followr)=>(
                    <Usertab userId={followr.targetId}>

                    </Usertab>
                )

                )
            }



            </div>
        </div>
    )
}