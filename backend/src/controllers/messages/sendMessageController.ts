import { Request, Response } from "express";
import { sendMessage } from "../../services/kafkaService";
import { prisma } from "../..";
import { ChatMessage } from "../../types/messagetype";
import { MessageSchema } from "../../validation/message";


export const sendMessageController = async(req: Request, res: Response) => {
    const body = MessageSchema.parse(req.body);

    const message = await prisma.messages.create({
        data:{
            senderId: body.senderId,
            receiverId: body.receiverId,
            content:body.content,
            topic:body.topic
        }
    });
    await sendMessage(message);
    res.status(200);
}