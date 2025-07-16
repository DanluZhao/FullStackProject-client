import React, { useState,useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';
import { API } from '../utils/api';

function Login() {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const {setAuthState} = useContext(AuthContext);

    let navigate = useNavigate(); 
    const login = () => {
        const data = {username:username,password:password};
        API.post("/auth/login",data).then((response) => {
            if(response.data.error){
              alert(response.data.error);
            }else{
              localStorage.setItem("accessToken",response.data.token);
              setAuthState({username:response.data.username,
                id:response.data.id,
                status:true});
              navigate("/");
            }
        });
    };
  return (
    <div className='loginContainer'>
      <input type="text" onChange={(event)=>{setUsername(event.target.value)}} placeholder="username" />
      <input type="password" onChange={(event)=>{setPassword(event.target.value)}} />
      <button onClick={login}>Login</button>
    </div>
  )
}

export default Login
