import { NextFunction,Request,Response } from "express";
import otpGenerator from "otp-generator";

export const generateOTP = async (req:Request, res: Response, next:NextFunction) =>{
    let OTP = otpGenerator.generate(6,{lowerCaseAlphabets:false, upperCaseAlphabets:false, specialChars:false})
    return OTP;
}