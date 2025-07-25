import React,{useState} from 'react';
import { API } from '../utils/api';

function ChangePassword() {

    const [oldPassword,setOldPassword] = useState("");
    const [newPassword,setNewPassword] = useState("");

const changePassword = async() =>{
    API.put('/auth/changepassword',
        {oldPassword:oldPassword,newPassword:newPassword},
        {headers:{accessToken:localStorage.getItem("accessToken")}}
    ).then((response)=>{
        if(response.data.error){
            alert(response.data.error);
        }
    });
};

  return (
    <div>
      <h1>Change your Password</h1>
      <input type='text' placeholder='Old Password'
      onChange={(event)=>{
        setOldPassword(event.target.value);
      }}/>
      <input type='text' placeholder='New Password'
      onChange={(event)=>{
        setNewPassword(event.target.value);
      }}/>
      <button onClick={changePassword}>Save Change</button>
    </div>
  )
}

export default ChangePassword
