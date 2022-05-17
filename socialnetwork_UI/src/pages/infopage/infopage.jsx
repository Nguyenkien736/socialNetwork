import react from 'react'
import {useContext,useEffect,useState} from 'react'
import { AuthContext } from '../../context/AuthContext'
import Topbar from '../../components/topbar/topbar'
import Leftbar from '../../components/leftbar/Leftbar'
import axios from 'axios'
import './infopage.css'

export default function Infopage(){
    const {user} = useContext(AuthContext)

    const [ediable,setEditable] = useState(false) 
    const [info,setInfo]= useState({})

    const [name,setName]= useState('')
    const [dob,setDob]= useState(new Date())
    const [email,setEmail]= useState('')
    const [phone,setPhone]= useState('')
    const [gender,setGender]= useState(false)

    useEffect(()=>{
        
        const fetchInfo = async()=>{
            const res = await axios.get(`/users/${user._id}/info`)
            setInfo(res.data)
            setName(res.data.name)
            setDob(Date.parse(res.data.dob))
            setEmail(res.data.email)
            setPhone(res.data.phonenumber)
            setGender(res.data.gender)
            
        }
        fetchInfo()

    },[])
    useEffect(()=>{
        
    },[info,ediable])

    
    const handleUpdateInfo = async ()=>{

        const res = await axios.put('/users/updateinfo',{
            username: user.username,
            name: name,
            dob: dob,
            phonenumber:phone,
            email: email,
            gender: gender
        })

        const resInfo = await axios.get(`/users/${user._id}/info`)
        setInfo(resInfo.data)



        
    }
    const handleEdits =()=>{
        setEditable(true)
    }





    return (
        <div>
            
            <Topbar></Topbar>
            <div className='body'>
                <Leftbar></Leftbar>
                <div className='inputForm'>
                <div className='inputEle'>
                    name : <input readOnly={!ediable} value={name} onInput={(e)=> setName(e.target.value)}></input>
                </div>
                <hr></hr>
                <div className='inputEle'>
                    Date of birth: <input readOnly={!ediable} type={'date'} value={dob} onInput={(e)=> setDob(e.target.value)}></input>
                </div >
                <hr></hr>
                <div className='inputEle'>
                    <span>email: </span> <input readOnly={!ediable} value={email} onInput={(e)=> setEmail(e.target.value)}></input>
                </div>
                <hr></hr>
                <div className='inputEle'>
                    phone number: <input readOnly={!ediable} value={phone} onInput={(e)=> setPhone(e.target.value)}></input>
                </div>
                <hr></hr>
                <div className='inputEle'>
                    gender: <input readOnly={!ediable} value={gender} onInput={(e)=> setGender(e.target.value)}></input>
                </div >
                <hr></hr>
                <button onClick={handleEdits}>Edit</button>
                <button onClick={handleUpdateInfo} disabled={!ediable} >Comfirm</button>
                </div>

            </div>

        </div>
    )
}