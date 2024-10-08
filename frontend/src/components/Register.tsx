
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { useState } from "react";
import { registerValidation } from "../helper/validate";
import convertToBase64 from "../helper/convert";
import { sendOTP } from "../helper/helper";

export const Register = () => {
    const [file, setFile]  =useState<string | null >();
    const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
        email:'',
        username:'',
        password:''
    },
    validate:registerValidation,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit: async values => {
      values = Object.assign(values,{ profile:file });
      try {
        const response = await sendOTP(values);
        if(response.status == 200){
          navigate("/otp",{state:{email:values.email,username:values.username,password:values.password}})
        }
      } catch (error) {
        toast.error("Something went wrong")
        console.log(error)
      }
      
    }
  });

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) =>{
    if (e.target.files && e.target.files.length > 0) {
        const base64 = await convertToBase64(e.target.files[0]);
        setFile(base64 as string);
      }
  }

    return (
        <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div>
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Register</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Happy to join us.
            </span>
          </div>
          
          <form className='py-1' onSubmit={formik.handleSubmit} >
              <div className='profile flex justify-center py-4'>
                <label htmlFor="profile">
                  <img src={file || avatar} className={styles.profile_img} alt="avatar" />
                </label>
                <input onChange={onUpload} type="file" id="profile" name="profile" />
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                  <input {...formik.getFieldProps('email')} className={styles.textbox} type="text" placeholder='Email' />
                  <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Username' />
                  <input {...formik.getFieldProps('password')} className={styles.textbox} type="password" placeholder='Password' />
                  <button className={styles.btn} type='submit'>Register</button>
              </div>

              <div className="text-center py-4">
                <span className='text-gray-500'>Already Register? <Link className='text-red-500' to="/">Login Now</Link></span>
              </div>

          </form>
         
        </div>
        </div>
      </div>
    </div>
    );
};



