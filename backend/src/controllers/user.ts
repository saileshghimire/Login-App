
import { NextFunction, Request, Response } from "express";
import { prisma } from "../index";
import { RegisterSchema } from "../validation/users";
import { hashSync } from "bcryptjs";
import { BadRequestsException } from "../exceptions/bad-request";
import { ErrorCodes } from "../exceptions/root";
import { InternalException } from "../exceptions/internal-exception";


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


