
import { NextFunction, Request, Response } from "express";
import { prisma } from "../index";
import { LoginSchema, RegisterSchema, VerifyOtpSchema } from "../validation/users";
import { compareSync, hashSync } from "bcryptjs";
import { BadRequestsException } from "../exceptions/bad-request";
import { ErrorCodes } from "../exceptions/root";
import { InternalException } from "../exceptions/internal-exception";
import { NotFoundException } from "../exceptions/not-found";
import jwt from "jsonwebtoken";
import { EMAIL_PASS,EMAIL_USER, JWT_SECRET } from "../secrets";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { deleteOTP, generateOTP, verifyotpFunction } from "./otpgenerate";

const transporter = nodemailer.createTransport({
    service:'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth:{
        user:EMAIL_USER,
        pass:EMAIL_PASS
    }
});

export const register = async (req:Request, res:Response, next:NextFunction) => {
        const body = RegisterSchema.parse(req.body);
        let existingUser = await prisma.user.findFirst({
            where:{
                OR: [
                    { email: body.email },
                    { username: body.username }
                ]
            }
        })

        if(existingUser){
            next(new BadRequestsException(existingUser.email === body.email ? "Email already exists" : "Username already exists",
                existingUser.email === body.email ? ErrorCodes.USER_ALREADY_EXISTS : ErrorCodes.USERNAME_ALREADY_EXISTS
            ));            
        }

        else{
            
            const otp = await generateOTP(body.email);
            // const otp = crypto.randomInt(100000,999999).toString();
            // await prisma.otp.create({
            //     data:{
            //         email: body.email,
            //         otp: otp,
            //         expiresAt: new Date(Date.now() +1 *60*1000)
            //     }
            // });


            return res.status(200).json({ message: "OTP has been sent to your email." });
     

        }

};

export const verifyOTP = async (req: Request, res:Response, next:NextFunction) => {
    const body = VerifyOtpSchema.parse(req.body);

    const storedOtp = await verifyotpFunction(body.email,body.otp)

    // const storedOtp = await prisma.otp.findFirst({
    //     where:{
    //         email: body.email,
    //         otp: body.otp,
    //         expiresAt:{
    //             gte: new Date()
    //         }
    //     }
    // });
    if (!storedOtp) {
        return next(new BadRequestsException("Invalid or expired OTP", ErrorCodes.INVALID_OTP));
    } else {
        const user = await prisma.user.create({
            data: {
              username: body.username,
              password: hashSync(body.password, 10),
              email: body.email
            }
          });

          await deleteOTP(body.email);
        // await prisma.otp.delete({
        //     where:{
        //         email:body.email
        //     }
        // })

        return res.status(200).json({ message: "Account created successfully", user });
    }

};

export const login = async(req:Request, res:Response,next:NextFunction) => {
    const body = LoginSchema.parse(req.body);
    let user = await prisma.user.findFirst({
        where:{
            username: body.username
        },
        select:{
            id:true,
            password:true
        }
    })
    if(!user){
        return next(new NotFoundException('User Doesnot exist', ErrorCodes.USER_NOT_FOUND));
    }
    
    if(!compareSync(body.password,user.password)){
        return next(new BadRequestsException('Incorrect password', ErrorCodes.INCORRECT_PASSWORD));
    }


    const token = jwt.sign({
        userId: user.id
    }, JWT_SECRET);
    res.cookie("token",token,{
        httpOnly: true,
        sameSite:'strict'
    }).json({
        message:"Logged in!"
    });

};

export const logout = (req:Request, res:Response) => {
    res.clearCookie("token").json({
        message:"Logged out!"
    });
}

export const forgetPassword = async (req:Request, res:Response, next:NextFunction) =>{

};