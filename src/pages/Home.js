import React from 'react'
import { useEffect,useState } from "react";
import {useNavigate,Link} from "react-router-dom";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { API } from '../utils/api';

function Home() {
    const [postList,setPostList] = useState([]);
    const [likedPosts,setLikedPosts] = useState([]);
    // const {authState} = useContext(AuthContext);
    let navigate = useNavigate();

  useEffect(()=>{
    if(!localStorage.getItem("accessToken")){
      navigate("/login");
    }else{
      API.get("/posts",{headers:{accessToken:localStorage.getItem("accessToken")}}).then((response)=>{
        setPostList(response.data.postList);
        setLikedPosts(response.data.likedPosts.map((like)=>{
          return like.PostId;
        }));
      });
    }
  },[navigate]);

  const likeAPost = async (postId) =>{
    await API.post("/likes",{PostId:postId},{
      headers:{
        accessToken:localStorage.getItem("accessToken"),
      }
    }).then((response)=>{
      setPostList(postList.map((post)=>{
        if(post.id === postId){
          if(response.data.liked){
            return {...post,Likes:[...post.Likes,0]};
          }else{
            const likesArray = post.Likes;
            likesArray.pop();
            return {...post,Likes:likesArray};
          }
          
        }else{
          return post;
        }
      }));

      if(likedPosts.includes(postId)){
        setLikedPosts(
          likedPosts.filter((id)=> {
            return id !== postId;
      }));
      }else{
        setLikedPosts([...likedPosts,postId]);
      }
    });
  }
  return (
    <div>
      {postList.map((value, key)=>{
        return(
          <div className="post" >
            <div className="title">{value.title}</div>
            <div className="body" onClick={()=>{navigate(`/post/${value.id}`)}}>{value.postText}</div>
            <div className="footer">
              <div className='username'>
                <Link to={`/profile/${value.UserId}`}>{value.username}</Link>
              </div>
              <div className='buttons'>
                <ThumbUpAltIcon onClick={
                ()=>{likeAPost(value.id)}} 
                className={
                  likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"
                }
                />
                <label className='likeCount'>{value.Likes.length}</label>
              </div>
              
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
