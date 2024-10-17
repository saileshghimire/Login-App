export interface ChatMessage {
    senderId: number;
    receiverId: number;
    content: string;
    timestamp?: Date;
  };