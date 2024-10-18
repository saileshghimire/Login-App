import { NextFunction, Request, Response } from "express";
import { prisma } from "../..";
import { compareSync, hashSync } from "bcryptjs";
import { generateOTP, sendOTP, verifyotpFunction } from "../otpgenerate";
import { ForgetPasswordSchema } from "../../validation/frogetpassword";
import { BadRequestsException } from "../../exceptions/bad-request";
import { ErrorCodes } from "../../exceptions/root";
import { NotFoundException } from "../../exceptions/not-found";

export const forgetPassword = async (req:Request, res:Response, next:NextFunction) =>{
    // const email = req.email as string
    const username = req.body.username as string;
    const user = await prisma.user.findFirstOrThrow({
        where:{
            username:username
        },
        select:{
           email:true
        }
    });
    const otp:any = await generateOTP(user.email);
    await sendOTP(user.email,otp);
    return res.status(200).json({message:"otp sent"});
};

export const verifyingOtpforget = async(req:Request, res:Response, next:NextFunction) =>{
    // const email = req.email as string
    // console.log(email);
    const username = req.body.username as string;
    const user = await prisma.user.findFirstOrThrow({
        where:{
            username:username
        },
        select:{
           email:true
        }
    });
    const storedOtp = await verifyotpFunction(user.email,req.body.otp,);
    if (!storedOtp) {
        return next(new BadRequestsException("Invalid or expired OTP", ErrorCodes.INVALID_OTP));
    }
    return res.status(200).json({message:"otp verified"});
}

export const changePassword = async(req:Request, res:Response, next:NextFunction) => {
    const body = ForgetPasswordSchema.parse(req.body);
    // const email = req.email as string;
    // const userId = req.userId;
    const username = req.body.username as string;
    const users = await prisma.user.findFirstOrThrow({
        where:{
            username:username
        },
        select:{
           email:true
        }
    });
    const user = await prisma.user.update({
        data:{
            password: hashSync(body.password, 10)
        },
        where:{
            email:users.email
        }
    });
    if(!user){
        next(new BadRequestsException("Can't changed password", ErrorCodes.PASSWORD_NOT_CREATED));
    }
    return res.status(200).json({
        message:"Password changed successfully"
    });
}