import React, { useEffect } from 'react';
import {Formik,Form,Field,ErrorMessage} from "formik";
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { API } from '../utils/api';

function CreatePost() {
  // const {authState} = useContext(AuthContext);
    const initialValues = {
        title:"",
        postText:"",
    };
    let navigate = useNavigate();

    useEffect(() => {
      if(!localStorage.getItem("accessToken")){
        navigate("/login");
      }
    },[navigate]);
  
    const validationSchema = Yup.object().shape({
        title:Yup.string().required("You must input a title"),
        postText:Yup.string().required()
    });

    const onSubmit = (data) =>{
        API.post("/posts",data,
          {headers:{accessToken:localStorage.getItem("accessToken")}}
        ).then((response)=>{
            navigate("/");
        })
    };

  return (
    <div className='createPostPage'>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className='formContainer'>
            <label>Title: </label>
            <ErrorMessage name='title' component="span"/>
            <Field autoComplete="off" id="inputCreatePost" name="title" placeholder="(EX:title...))" />
            <label>Post: </label>
            <ErrorMessage name='postText' component="span"/>
            <Field autoComplete="off" id="inputCreatePost" name="postText" placeholder="(EX:I had a ...))" />
            <button type="submit">Create Post</button>
        </Form>
      </Formik>
    </div>
  )
}

export default CreatePost
