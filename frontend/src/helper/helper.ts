import axios from "axios";

export const sendOTP = async (data:any) =>{
    return await axios.post("http://localhost:3000/api/user/register", data);
}

export const verifyOTP = async (data:any) =>{
    return await axios.post("http://localhost:3000/api/user/verifyOTP",data);
}

export const sendlogin = async (data:any) =>{
    return await axios.post("http://localhost:3000/api/user/login",data,{withCredentials:true})
}

export const forgetPassword = async(data:any) => {
    return await axios.post('http://localhost:3000/api/password/forgetpassword', data, {withCredentials:true});
}

export const verifyingOtpforget = async(data:any) => {
    return await axios.post('http://localhost:3000/api/password/verifyingOtpforget', data, {withCredentials:true});
}

export const changePassword = async(data:any) => {
    return await axios.post('http://localhost:3000/api/password/hangePassword', data, {withCredentials:true});
}