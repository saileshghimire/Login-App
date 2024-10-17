import { z } from "zod";

export const MessageSchema = z.object({
    senderId: z.number(),
    receiverId: z.number(),
    content : z.string(),
    topic: z.string()
})