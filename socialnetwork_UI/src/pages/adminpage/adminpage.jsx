import React from "react";
import axios from "axios";
import { useEffect,useContext,useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Topbar from "../../components/topbar/topbar";
import Leftbar from "../../components/leftbar/Leftbar";
import UserTab from '../../components/usertab/usertab'
import { useRoutes } from "react-router";
import UserWrapper from "../../components/userWrapper/userwrapper";
import './adminpage.css'

export default function AdminPage(){
    const {user}= useContext(AuthContext)
    const [users,setUsers]= useState([])
    useEffect(()=>{
        const fetchUsers = async()=>{
            const res = await axios.get('/users/admin/getAllUser')
            setUsers(res.data)
            
        }
        fetchUsers()

    },[])
    
    useEffect(()=>{

    },[users])
    return(
        user.username=='admin'?(
        <div>
            <Topbar></Topbar>
            <div className="body">
                <Leftbar></Leftbar>
                <div className="container">
                    {
                        users.map((ele)=>(
                            <UserWrapper UserId={ele._id}></UserWrapper>
                            
                          
                            

                        ))
                    }

                </div>
            </div>

        </div>
        
    ):(<div>ERR</div>)
    )


}