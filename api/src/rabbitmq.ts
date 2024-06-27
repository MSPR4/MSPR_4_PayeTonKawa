// src/rabbitmq.ts
import amqp, { Connection, Channel, Options, Replies } from 'amqplib/callback_api';

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://rabbitmq';

let channel: Channel | null = null;

amqp.connect(RABBITMQ_URL, function (error0: any, connection: Connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1: any, ch: Channel) {
    if (error1) {
      throw error1;
    }
    channel = ch;
    console.log('RabbitMQ connected');
  });
});

export function sendToQueue(queue: string, message: string) {
  if (channel) {
    channel.assertQueue(queue, {
      durable: false
    });
    channel.sendToQueue(queue, Buffer.from(message));
    console.log(" [x] Sent %s", message);
  } else {
    console.error("Channel not available");
  }
}
