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
exports.receiveMessage = exports.sendMessage = void 0;
const kafka_1 = require("../kafka");
const sendMessage = (message) => __awaiter(void 0, void 0, void 0, function* () {
    const topic = getTopicName(message.senderId, message.receiverId);
    yield kafka_1.producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }]
    });
});
exports.sendMessage = sendMessage;
const receiveMessage = (userId, onMessage) => __awaiter(void 0, void 0, void 0, function* () {
    const topics = yield getUserTopics(userId);
    for (const topic of topics) {
        yield kafka_1.consumer.subscribe({ topic, fromBeginning: true });
    }
    yield kafka_1.consumer.run({
        eachMessage: (_a) => __awaiter(void 0, [_a], void 0, function* ({ message }) {
            if (message.value) {
                const chatMessage = JSON.parse(message.value.toString());
                onMessage(chatMessage);
            }
        }),
    });
});
exports.receiveMessage = receiveMessage;
const getTopicName = (userId1, userId2) => {
    return `chat-${Math.min(userId1, userId2)}-${Math.max(userId1, userId2)}`;
};
const getUserTopics = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // const userId = req.userId;
    return [`chat-${userId}-*`];
});
