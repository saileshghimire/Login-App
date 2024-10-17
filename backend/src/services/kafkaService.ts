import { producer, consumer } from "../kafka";
import { ChatMessage } from "../types/messagetype";
import { Request } from "express";

export const sendMessage  = async (message: ChatMessage) => {
    const topic = getTopicName(message.senderId, message.receiverId);
    await producer.send({
        topic,
        messages: [{value:JSON.stringify(message)}]
    });
};

export const receiveMessage = async(userId:number, onMessage: (message:ChatMessage) => void) =>{
    const topics = await getUserTopics(userId);
  for (const topic of topics) {
    await consumer.subscribe({ topic, fromBeginning: true });
  }

  await consumer.run({
    eachMessage: async ({ message }) => {
      if (message.value) {
        const chatMessage: ChatMessage = JSON.parse(message.value.toString());
        onMessage(chatMessage);
      }
    },
  });
}




const getTopicName = (userId1: number, userId2: number): string => {
  return `chat-${Math.min(userId1, userId2)}-${Math.max(userId1, userId2)}`;
};

const getUserTopics = async (userId:number): Promise<string[]> => {
    // const userId = req.userId;
    return [`chat-${userId}-*`];
}