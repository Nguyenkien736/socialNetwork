import { Search } from "@mui/icons-material";
import React from "react";
import './topbar.css'
import { Link } from "react-router-dom";
import {useState, useContext} from 'react'
import {AuthContext} from '../../context/AuthContext'
export default function Topbar(){
    const {user} = useContext(AuthContext)


    function handleSearch(){
        const inputText = document.getElementById('searchText')
        if(!inputText) return ""
        else
        return inputText.innerText
        
    }

    
    const [input,setInput]= useState('')
    const HandleLogout =()=>{
        localStorage.clear();
        window.location.href='http://localhost:3000/'
    }


    return(
        <div className="topbar">
            <div className="topbarleft">
                <Link to="/home">
                    <div className="logo"> Reading</div>
                </Link>
                
                </div>
            <div className="topbarcenter">
                <div className="searchbar">
                    <Link to={"/search/"+input}>
                    <Search className="searchicon"></Search>
                    </Link>
                    

                    <input id="searchText" className="searchfield" placeholder="User name" onInput={e => setInput(e.target.value)}></input>


                </div>
              
            </div>
            <div  className="topbarright">
                <Link to={"/followers"}>Followers</Link>
                <Link to={"/followings"}>Followings</Link>
                <Link to={"/infopage"}>Info</Link>
                <button onClick={HandleLogout}>Log out</button>
                <a href="#">
                <div className="topbarImg">

                    <img className="topbarImg" src={user.profile_picture ?
              `http://localhost:8800/images/${user.profile_picture}`
              :   `http://localhost:8800/images/noprofilepic.png`}
>
                    </img>
                    
                    
                </div>
                </a>
                
            </div>
        </div>
    )

}