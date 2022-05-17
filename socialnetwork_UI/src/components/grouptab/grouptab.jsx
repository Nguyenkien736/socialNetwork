import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {useEffect,useState, useContext} from 'react'
import './grouptab.css'
import { AuthContext } from '../../context/AuthContext'
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';
export default function Grouptab({groupId}){
    const {user} = useContext(AuthContext)
    const [group,setGroup]= useState({})
    const [role,setRole] = useState('')
    useEffect(()=>{
        const fetchGroup = async ()=>{
            const res = await axios.get('/groups/'+groupId)
            const roleRes = await axios.get('/groups/'+ groupId+'/getRole/'+user._id)
            setRole(roleRes.data)

            setGroup(res.data)
        }
        fetchGroup()
    },[])
    const joinGroupHandler = async()=>{
        await axios.post('/groups/'+groupId+'/addrequestmember',{userId:user._id})
    }
    

    return (
        <div className='GroupTab'>
            < div className='namespace'>
            <span className='groupIcon'><GroupsIcon></GroupsIcon></span>
            <Link className='groupName' to = {"/groups/"+groupId} >{group.tittle}</Link>
            
            <span></span>
            {
                role != 'guest' ? (<span className='roles'>{' ('+role+')'}</span>): 
                <button className='RequestButton' onClick={joinGroupHandler}>join group</button>
            }
            </div>
            <div className='manageSettings'>
            {
                role == 'admin'?(
                
                  <Link className='manageButton' to={
                      '/groups/'+groupId+'/adminpage'
                  }><SettingsIcon></SettingsIcon></Link>
                 
                ):
                (<></>)
            }
            </div>

            

        </div>
    )

}