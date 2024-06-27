// src/consumer.ts
import amqp from 'amqplib/callback_api';
import { config } from './config/config';

export function consumeMessages(queue: string): void {
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
      console.log(`[*] Waiting for messages in ${queue}`);
      channel.consume(queue, (msg) => {
        if (msg !== null) {
          const messageContent = msg.content.toString();
          console.log(`[x] Received ${messageContent}`);
          // Process the message here
          // You can add additional logic here to process the message
          channel.ack(msg);
        }
      });
    });
  });
}
