"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSchema = void 0;
const zod_1 = require("zod");
exports.MessageSchema = zod_1.z.object({
    senderId: zod_1.z.number(),
    receiverId: zod_1.z.number(),
    content: zod_1.z.string(),
    topic: zod_1.z.string()
});
