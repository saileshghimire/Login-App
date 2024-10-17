import { Kafka } from "kafkajs";

export const kafka = new Kafka({
    clientId: 'chat-app',
    brokers:['localhost:9002'],
});


export const producer = kafka.producer();
export const consumer = kafka.consumer({groupId: 'chat-group'});

export const initKafka = async() =>{
    await producer.connect();
    await consumer.connect();
};