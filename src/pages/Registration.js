import React from 'react'
import {Formik,Form,Field,ErrorMessage} from "formik";
import * as Yup from 'yup';
import { API } from '../utils/api';

function Registration() {
     const initialValues = {
            username:"",
            password:""
        };
    
        const validationSchema = Yup.object().shape({
            username:Yup.string().min(3).max(15).required(),
            password:Yup.string().min(4).max(20).required()
        });
    
        const onSubmit = (data)=>{
            API.post("/auth",data).then((response)=>{
                console.log(response);
            });
        };
  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
              <Form className='formContainer'>
                  <label>Username: </label>
                  <ErrorMessage name='username' component="span"/>
                  <Field autoComplete="off" id="inputCreatePost" name="username" placeholder="(EX:John...))" />
                  <label>Password: </label>
                  <ErrorMessage name='password' component="span"/>
                  <Field type="password" autoComplete="off" id="inputCreatePost" name="password" placeholder="Your Password..." />
                  
                  <button type="submit">Register</button>
              </Form>
            </Formik>
    </div>
  )
}

export default Registration
