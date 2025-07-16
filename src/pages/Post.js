import React,{useEffect, useState,useContext} from 'react';
import {useParams,useNavigate} from 'react-router-dom';
import { API } from '../utils/api';
import { AuthContext } from '../helpers/AuthContext';

function Post() {
    let {id} = useParams();
    const [postObject,setPostObject] = useState({});
    const [comments,setComments] = useState([]);
    const [newComment,setNewComment] = useState("");
    const {authState} = useContext(AuthContext);
  
    let navigate = useNavigate();

    useEffect(()=>{
        API.get(`/posts/byId/${id}`).then((response)=>{
          setPostObject(response.data);
        });
        API.get(`/comments/${id}`).then((response)=>{
          setComments(response.data);
        });
    },[id]);
   
    const addComment = ()=>{
      API.post("/comments",{
        commentBody:newComment,
        PostId:id},
      {
        headers:{
          accessToken: localStorage.getItem("accessToken")
        }
      }
      )
      .then((response)=>{
        if(response.data.error){
          console.log(response.data.error);
        }else{
          const commentToAdd = {commentBody:newComment,username:response.data.username};
          setComments([...comments,commentToAdd]);
          setNewComment("");
        }
        
    });
    }

    const deleteComment = (id) =>{
      API.delete(`/comments/${id}`,{headers:{
          accessToken: localStorage.getItem("accessToken")
        }}).then(()=>{
          setComments(comments.filter((val) => {
            return val.id !== id;
          }));
        });
    }

    const deletePost = (id) =>{
      API.delete(`/posts/${id}`,{headers:{
          accessToken: localStorage.getItem("accessToken")
        }}).then((response)=>{
          navigate("/");
      });
    }

    const editPost = (option) =>{
      if(option === "title"){
        let newTitle = prompt("Enter New Title:");
        API.put('/posts/title',
          {newTitle:newTitle,id:id},
          {headers:{
            accessToken: localStorage.getItem("accessToken")
          }});
          setPostObject({...postObject,title:newTitle});
      }else{
        let newPostText = prompt("Enter New PostText:");
        API.put('/posts/postText',
          {newText:newPostText,id:id},
          {headers:{
            accessToken: localStorage.getItem("accessToken")
        }});
        setPostObject({...postObject,postText:newPostText});

      }
    }

  return (
    <div className='postPage'>
      <div className='leftSide'>
        <div className='post' id='individual'>
          <div className='title' onClick={()=>{
            if(authState.username === postObject.username){
              editPost('title')
            }
            }}>{postObject.title}</div>
          <div className='body' onClick={()=>{
            if(authState.username === postObject.username){
              editPost('body')
            }
            }}>{postObject.postText}</div>
          <div className='footer'>
            {postObject.username} 
            {authState.username === postObject.username && (
              <button onClick={()=>{deletePost(postObject.id)}}>Delete Post</button>
            )}
          </div>
        </div>
      </div>
      <div className='rightSide'>
        <div className='addCommentContainer'>
          <input type='text' placeholder='Comment...' 
          value={newComment}
          autoComplete='off' onChange={
            (event) => {setNewComment(event.target.value)
          }}/>
          <button onClick={addComment}>Add Comment</button>
        </div>
        <div className='listOfComments'>
          {comments.map((comment,key)=>{
            return <div key={key} className='comment'>
              {comment.commentBody}
              <label> UserName: {comment.username}</label>
              {authState.username === comment.username && <button onClick={() => {deleteComment(comment.id)}}> X </button>}
              </div>
          })}
        </div>
      </div>
    </div>
  )
}

export default Post
