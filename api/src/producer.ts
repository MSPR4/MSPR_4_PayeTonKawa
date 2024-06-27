// src/producer.ts
import amqp from 'amqplib/callback_api';
import { config } from './config/config';

export function sendMessage(queue: string, message: string): void {
  amqp.connect(config.rabbitmq.url, (error0, connection) => {
    if (error0) {
      throw error0;
    }
    connection.createChannel((error1, channel) => {
      if (error1) {
        throw error1;
      }
      channel.assertQueue(queue, {
        durable: false
      });
      channel.sendToQueue(queue, Buffer.from(message));
      console.log(`[x] Sent ${message}`);
    });

    setTimeout(() => {
      connection.close();
    }, 500);
  });
}