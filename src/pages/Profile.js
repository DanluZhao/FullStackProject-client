import React, { useEffect, useState,useContext } from 'react';
import {useParams,useNavigate} from 'react-router-dom';
import { API } from '../utils/api';
import { AuthContext } from '../helpers/AuthContext';

function Profile() {
  let {id} = useParams();
  let navigate = useNavigate();
  const [username,setUsername] = useState("");
  const [listOfPosts,setListOfPosts] = useState([]);
  const {authState} = useContext(AuthContext);

  useEffect(()=>{
    API.get(`/auth/basicinfo/${id}`).then((response)=>{
        setUsername(response.data.username);
    });
    API.get(`/posts/byuserId/${id}`).then((response)=>{
        setListOfPosts(response.data);
    });
  },[id]);

  return (
    <div className='profilePageContainer'>
      <div className='basicInfo'>
        <h1> Username: {username}</h1>
        {authState.username === username &&
         (<button onClick={()=>{navigate('/changepassword')}}>Change My Password</button>)}
      </div>
      <div className='listOfPosts'>
        {listOfPosts.map((value, key)=>{
        return(
          <div className="post" >
            <div className="title">{value.title}</div>
            <div className="body" onClick={()=>{navigate(`/post/${value.id}`)}}>{value.postText}</div>
            <div className="footer">
              <div className='username'>{value.username}</div>
              <div className='buttons'>
                <label className='likeCount'>{value.Likes.length}</label>
              </div>
              
            </div>
          </div>
        );
      })}
      </div>
    </div>
  )
}

export default Profile
