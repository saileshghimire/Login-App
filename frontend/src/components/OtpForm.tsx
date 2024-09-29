import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom"
import { Otp } from "../container/Otp";


export const OtpForm = () =>{
    const navigate = useNavigate();
    const location = useLocation();
    const { email,username,password } = location.state ||{};
    const [otp, setOtp] = useState<string>("");

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            const response = await axios.post("http://localhost:3000/api/user/verifyOTP",{otp,email,username,password});
            if(response.status === 200){
                navigate("/");
            }else{
                toast.error(response.data.message || "Invalid or expired OTP")
            }
        };
    
    return(<>
    <Otp
        title="OTP Verification"
        subtitle="Enter OTP to verify your account."
        otp={otp}
        setOtp={setOtp}
        handleSubmit={handleSubmit}
      />
    </>)
}