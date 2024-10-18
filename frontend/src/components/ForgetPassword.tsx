

import { useLocation, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../helper/validate";
import { sendlogin } from "../helper/helper";
import { useState } from "react";

export const ForgetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = location.state;


  const formik = useFormik({
    initialValues: {
      password:'',
      resetPasswordValidation:''
    },
    validate:passwordValidate,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit: async values => {
      values = Object.assign(values,{username})
      try {
        console.log(values);
        
        const response = await sendlogin(values);
        if(response.status == 200){
          navigate('/')
        }else{
          toast.error(response.data.message)
        }
      } catch (error) {
        console.log(error);
        
      }
      
    }
  });

    return (
        <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div>
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Hello Again!</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Explore More by connecting with us.
            </span>
          </div>
          
          <form className='py-1' onSubmit={formik.handleSubmit} >
              <div className='profile flex justify-center py-4'>
                  <img src={avatar} className={styles.profile_img} alt="avatar" />
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                  <input {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder='Password' />
                  <input {...formik.getFieldProps('confirmpassword')} className={styles.textbox} type="text" placeholder=' Confirm Password' />
                  <button className={styles.btn} type='submit'>Signin</button>
              </div>
              

          </form>
         
        </div>
        </div>
      </div>
    </div>
    );
};

