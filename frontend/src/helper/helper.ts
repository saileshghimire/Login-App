import axios from "axios";

export const sendOTP = async (data:any) =>{
    return await axios.post("http://localhost:3000/api/user/register", data);
}

export const verifyOTP = async (data:any) =>{
    return await axios.post("http://localhost:3000/api/user/verifyOTP",data);
}

export const sendlogin = async (data:any) =>{
    return await axios.post("http://localhost:3000/api/user/login",data)
}