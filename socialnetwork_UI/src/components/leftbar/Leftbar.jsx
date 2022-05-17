import React from "react";
import { Link } from "react-router-dom";
import "./leftbar.css"
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import FolderIcon from '@mui/icons-material/Folder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
export default function Leftbar(){
    const {user}= useContext( AuthContext )
    
    return(
        <div className="leftbar">
            <li className="leftBarLink">
                
                <Link to={`/profile/${user.username}`} className="linkReact">
                    <div className="linkContainer">
                     <AccountCircleIcon></AccountCircleIcon>
                    <span>profile</span>
                    </div>
                </Link>
                
            </li>
            <li className="leftBarLink">
                
                
            <Link to="/mygroups" className="linkReact">
                <div className="linkContainer">
                <GroupIcon></GroupIcon>
                <span>group</span>
                </div>
                </Link>
            
               
            </li>
            <li  className="leftBarLink">
                
            <Link to="/likedposts" className="linkReact">
                <div className="linkContainer">
            <FavoriteIcon></FavoriteIcon>
                    <span>liked post</span>
                    </div>
                </Link>
                
            </li>
            <li className="leftBarLink">
               
                
                <Link to="/savedthreads" className="linkReact">
                    <div className="linkContainer">
                     <FolderIcon></FolderIcon>
                    <span>saved threads</span>
                    </div>
                </Link>
                
            </li>
            <li className="leftBarLink"> 
            <Link to="/mythread" className="linkReact">
                <span  className="linkContainer">
                <LibraryBooksIcon></LibraryBooksIcon>
                    my thread

                </span>
             </Link>
               
               
            </li>
           
        </div>

    )
}