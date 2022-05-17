// fetch feed time line

import "./profile.css";
import Topbar from "../../components/topbar/topbar";

import Feed from "../../components/feed/feed";
import Rightbar from "../../components/rightpanel/rightpanel";
import {Link} from 'react-router-dom'
import { useContext, useEffect,useState } from "react";
import {AuthContext} from '../../context/AuthContext'
import axios from 'axios'

import {useParams} from 'react-router-dom'
import Leftbar from "../../components/leftbar/Leftbar";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonOffIcon from '@mui/icons-material/PersonOff';
export default function Profile() {
  const [followed,setFollowed] = useState({})
  const [file, setFile] = useState(null);
  const [cover, setCover] =useState(null);
  
  const {user} = useContext(AuthContext)
  const {username} = useParams()
  const [currentUser,setCurrentUser] = useState({})
  useEffect(()=>{
    const checkFollows = async ()=>{
    const res = await axios.get(`/users/${username}/checkfollow/`+user._id)
    const userRes= await axios.get(`/users/?username=${username}`)
    setCurrentUser(userRes.data)
    console.log(res)
    setFollowed(res.data)
    }
    checkFollows()

  },[])
  useEffect(()=>{
    console.log(0)

  },[followed,currentUser])
  
  const handleFollow = async ()=>{
    const sourceId=user._id


    const res = await axios.put(`/users/${username}/follow`,{userId:sourceId})
    setFollowed(true)

  }
  const handleUnfollow = async ()=>{
    const sourceId=user._id


    const res = await axios.put(`/users/${username}/unfollow`,{userId:sourceId})
    setFollowed(false)

  }
  
  const handleChangeProfile = async ()=>{
    
    
    if (file) {
      const data = new FormData();
      const fileName = user.username + 'profilepic'+Date.now()+file.name;
      data.append("name", fileName);
      data.append("file", file);
      const changeProfilepic =async ()=>{
        
      }     
      try {
          await axios.post("/upload", data);
          currentUser.profile_picture ? 
          await axios.post('/deletepic',{picname: currentUser.profile_picture})
          : console.log('something')
          await axios.post('/users/updateprofilepic',{userId:user._id,profilepic:fileName}) 
          
          const userRes= await axios.get(`/users/?username=${username}`)
          
          setCurrentUser(userRes.data)

          
      } catch (err) {

      }
      window.location.reload()
    }

   

    
    
   
    
  }

  const handleChangeCover = async ()=>{
    
    if (cover) {
      const data = new FormData();
      const fileName = user.username + 'coverpic'+Date.now()+cover.name;
      data.append("name", fileName);
      data.append("file", cover);
      const changeProfilepic =async ()=>{
        
      }     
      try {
          await axios.post("/upload", data);
          currentUser.cover_photo ?
          await axios.post('/deletepic',{picname: currentUser.cover_photo}) : console.log(0)
          await axios.post('/users/updatecoverphoto',{userId:user._id,coverphoto:fileName}) 
          console.log('get Blocked')
          
      } catch (err) {}


      window.location.reload()
    }
   
  }


  return (
    <div>
      <Topbar />
      <div className="body">
      <Leftbar />
      
          
           

      
       <div>
          <div className="pictureArea">
          <div className="coverWrapper">
                <img className="coverpic" src={
                   currentUser.cover_photo ?
                   `http://localhost:8800/images/${currentUser.cover_photo}`
                   :   `http://localhost:8800/images/noprofilepic.png`
     
      
                }
                ></img>
                 
               
                <div className="changCoverButtons">
                  {

                    user._id==currentUser._id?
                    (
                <div>
                <button onClick={handleChangeCover} >
                  <ChangeCircleIcon></ChangeCircleIcon>
                </button>
                <label htmlFor="coverfile" className="shareOption">
              
                  <AddAPhotoIcon></AddAPhotoIcon>
                  <input
                  hidden
               
                  type="file"
                  id ="coverfile"
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => setCover(e.target.files[0])}
                  />
                 </label>
                 </div>
                    ):(<></>)
}
                 {
              
                  user.username == username ? (<></>)
                  : followed ? <button onClick={handleUnfollow}><PersonOffIcon></PersonOffIcon></button>
                  : (<button onClick={handleFollow}><PersonAddIcon></PersonAddIcon></button>)

                 }
                 </div>

            </div>
          <div className="profileWrapper">
            <img className="profilepic" src= {
              currentUser.profile_picture ?
              `http://localhost:8800/images/${currentUser.profile_picture}`
              :   `http://localhost:8800/images/noprofilepic.png`

            } ></img>
            
            <label htmlFor="file" className="shareOption">
              
            <AddAPhotoIcon></AddAPhotoIcon>
              <input
                hidden
               
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            
            <button onClick={handleChangeProfile} >
            <ChangeCircleIcon></ChangeCircleIcon>
            </button>

            
            </div>
            
            
            
            </div>
            <div className="opener">{"User's Timeline"}</div>
            <div className='feeds'>  
             <Feed username={username}>  
           </Feed>
           </div>

           </div>
        </div>
     
       
       </div>
    
  );

}
