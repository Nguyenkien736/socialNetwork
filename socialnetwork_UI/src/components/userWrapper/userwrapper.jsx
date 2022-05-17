import React from 'react'
import axios from 'axios'
import UserTab from '../usertab/usertab'

export default function UserWrapper({UserId}){


    
    const handleDelete = async () => {
        await axios.post('/users/'+UserId+'/deleteuser',{isAdmin:true})
        window.location.reload()

    }
    return(
        <div>
        <UserTab userId={UserId}>
        </UserTab>
        <button onClick={handleDelete}> Delete</button>
        </div>
    )

}