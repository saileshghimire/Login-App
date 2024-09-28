

import styles from "../styles/Username.module.css";
import { Toaster } from "react-hot-toast";

type OtpProps= {
    title: string;
    subtitle: string;
    otp: string;
    setOtp: (value: string) => void;
    handleSubmit: (event: React.FormEvent) => void;
  }

export const Otp = ({ title, subtitle, otp, setOtp, handleSubmit }: OtpProps) => {
    return (
        <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div>
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>{title}</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              { subtitle }
            </span>
          </div>
          
          <form className='py-1' onSubmit={handleSubmit} >
              <div className="textbox flex flex-col items-center gap-6">
                  <input className={styles.textbox} type="text" placeholder='OPT'value={otp}
                  onChange={(e) => setOtp(e.target.value)} />
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
