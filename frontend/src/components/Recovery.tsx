
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/Username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { verifyingOtpforget } from "../helper/helper";


export const Recovery = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {username} = location.state;
  const [ otp, setOtp ] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(username);
    
    const value = { otp, username };
    console.log(value);
    
    const response = await verifyingOtpforget(value);
    if(response.status === 200){
        navigate("/forgetpassword",{state:{username:value.username}});
    }else{
        toast.error(response.data.message || "Invalid or expired OTP")
    }
};

    return (
        <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div>
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Recovery</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Enter OTP to recover password. 
            </span>
          </div>
          
          <form className='py-1' onSubmit={handleSubmit} >
              <div className="textbox flex flex-col items-center gap-6">
                  <input className={styles.textbox}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}type="text" placeholder='OPT' />
                  <button className={styles.btn} type='submit'>Let's Go</button>
              </div>

              <div className="text-center py-4">
                <span className='text-gray-500'>Cant't get OPT? <button className='text-red-500'>Resend</button></span>
              </div>

          </form>
         
        </div>
        </div>
      </div>
    </div>
    );
};
