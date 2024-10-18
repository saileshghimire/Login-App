import { NextFunction,Request,Response } from "express";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import { EMAIL_PASS,EMAIL_USER } from "../secrets";
import crypto from "crypto";
import { prisma } from "..";
import { log } from "console";

export const generateOTP = async (email:string) =>{
    try {
        const OTP = crypto.randomInt(100000,999999).toString();
        await prisma.otp.create({
            data:{
                email: email,
                otp: OTP,
                expiresAt: new Date(Date.now() +1 *60*1000)
            }
        });
        return OTP;   
    } catch (error) {
        return error;
    }
    
};

const transporter = nodemailer.createTransport({
    service:'gmail',
    // host: "smtp.gmail.com",
    // port: 587,
    // secure: false,
    auth:{
        user:EMAIL_USER,
        pass:EMAIL_PASS
    }
});

export const sendOTP= async (email:string,otp:string) => {
    try {
        await transporter.sendMail({
            from: EMAIL_USER,
            to: email,
            subject:"Your OTP Code",
            text: `Your OTP code is: ${otp}. It is valid for 1 minutes.`
        }); 
    } catch (error) {
        console.log(error)
    }
    
};

export const verifyotpFunction = async(email:string,otp:string) =>{
    return await prisma.otp.findFirst({
        where:{
            email: email,
            otp: otp,
            expiresAt:{
                gte: new Date()
            }
        }
        });
};

export const deleteOTP = async(email:string) => {
    await prisma.otp.delete({
        where:{
            email:email
        }
    });
}