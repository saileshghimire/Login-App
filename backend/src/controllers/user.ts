
import { NextFunction, Request, Response } from "express";
import { prisma } from "../index";
import { LoginSchema, RegisterSchema } from "../validation/users";
import { compareSync, hashSync } from "bcryptjs";
import { BadRequestsException } from "../exceptions/bad-request";
import { ErrorCodes } from "../exceptions/root";
import { InternalException } from "../exceptions/internal-exception";
import { NotFoundException } from "../exceptions/not-found";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";


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
            const user = await prisma.user.create({
                data:{
                    username:body.username,
                    password: hashSync(body.password,10),
                    email: body.email,
                    firstName: body.firstName,
                    lastname:body.lastName,
                    mobile: body.mobile,
                    address: body.address,
                    profile: body.profile
                }
            })
            return res.status(200).json(user);      

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
    res.cookie("token",token).json({
        message:"Logged in!"
    });

};

export const logout = (req:Request, res:Response) => {
    res.clearCookie("token").json({
        message:"Logged out!"
    });
}