"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessageController = void 0;
const kafkaService_1 = require("../../services/kafkaService");
const __1 = require("../..");
const message_1 = require("../../validation/message");
const sendMessageController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = message_1.MessageSchema.parse(req.body);
    const message = yield __1.prisma.messages.create({
        data: {
            senderId: body.senderId,
            receiverId: body.receiverId,
            content: body.content,
            topic: body.topic
        }
    });
    yield (0, kafkaService_1.sendMessage)(message);
    res.status(200);
});
exports.sendMessageController = sendMessageController;
