import { NextFunction, Request, Response } from "express";
import { prisma } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCodes } from "../exceptions/root";
import { UpdateUserSchema } from "../validation/users";
import { hashSync } from "bcryptjs";
import { any } from "zod";



export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const username: string = req.params.username;

        const user = await prisma.user.findFirst({
            where: { username: username }
        });

        if (!user) {
            return next(new NotFoundException("User Not Found", ErrorCodes.USER_NOT_FOUND));
        }

        return res.json(user);

    } catch (error) {
        return next(new NotFoundException("An error occurred while fetching the user", ErrorCodes.USER_NOT_FOUND));
    }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
        const body = UpdateUserSchema.parse(req.body);

        const data: any = {
            username: body.username,
            email: body.email,
            firstName: body.firstName,
            lastname: body.lastName,
            mobile: body.mobile,
            address: body.address,
            profile: body.profile
        };
        
        if (body.password) {
            data.password = hashSync(body.password, 10);
        }

        const updatedUser = await prisma.user.update({
            where:{
                id: req.userId,
            },
            data: data,
        });
        return res.json({
            message:"updated",
            updatedUser
        });
}