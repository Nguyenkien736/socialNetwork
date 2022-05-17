import React from 'react'
import Topbar from '../../components/topbar/topbar'
import Leftbar from '../../components/leftbar/Leftbar'
import {useEffect,useContext,useState} from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import Usertab from '../../components/usertab/usertab'


export default function FollowingsPage()
{
    const [followings,setFollowings] = useState([]) 
    const {user} =useContext(AuthContext)
    useEffect(()=>{

        const fetchFollowings = async ()=>{
            const res = await axios.get(`/users/${user._id}/getfollowing`) 
            setFollowings(res.data)
        }
        fetchFollowings()

    },[])


    return (
        <div>
            <Topbar></Topbar>
            <div className="body">
            <Leftbar></Leftbar>
            {
                followings.map((following)=>(
                    <Usertab userId={following.sourceId}>

                    </Usertab>
                )

                )
            }



            </div>
        </div>
    )
}