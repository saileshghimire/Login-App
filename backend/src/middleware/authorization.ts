import { NextFunction, Request, Response } from "express";
import { ErrorCodes } from "../exceptions/root";
import { UnauthorizedException } from "../exceptions/unauthorized";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prisma } from "..";


export const authMiddleware = async (req:Request, res:Response, next:NextFunction) => {
    // try {
    console.log(`hi`);
    
        const token = req.cookies.token;
        console.log(`hi token..:${token}`);
        
        if(!token){
            next(new UnauthorizedException('Unauthorized.', ErrorCodes.UNAUTHORIZED_ACCESS));
        }
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        console.log(`decoded:${decoded}`);
        
        const user = await prisma.user.findFirst({
            where:{
                id:decoded.userId
            }});
            if(user){
                req.userId = user.id;
                req.username = user.username;
                console.log(req.username);
                next();
                
            }else{
                next(new UnauthorizedException('Unauthorized..', ErrorCodes.UNAUTHORIZED_ACCESS))
            }
    // } catch (error) {
    //     next(new UnauthorizedException('Unauthorized...', ErrorCodes.UNAUTHORIZED_ACCESS))
    // }
}