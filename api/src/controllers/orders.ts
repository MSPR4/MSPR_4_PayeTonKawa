import { Request, Response } from 'express';
import db from '../db';
import { RowDataPacket, FieldPacket, OkPacket } from 'mysql2';
import { sendMessage } from '../producer'; // Importer la fonction sendMessage

interface Order {
  id: number;
  customer_id: number;
  product_id: number;
  quantity: number;
}

export const getOrders = async (req: Request, res: Response) => {
  const [rows]: [RowDataPacket[], FieldPacket[]] = await db.query('SELECT * FROM orders');
  res.json(rows);
};

export const getOrderById = async (req: Request, res: Response) => {
  const [rows]: [RowDataPacket[], FieldPacket[]] = await db.query('SELECT * FROM orders WHERE id = ?', [req.params.id]);
  res.json(rows[0]);
};

export const createOrder = async (req: Request, res: Response) => {
  const { customer_id, product_id, quantity } = req.body;
  const [result]: [OkPacket, FieldPacket[]] = await db.query('INSERT INTO orders (customer_id, product_id, quantity) VALUES (?, ?, ?)', [customer_id, product_id, quantity]);
  const order = { id: result.insertId, customer_id, product_id, quantity };
  
  // Envoyer un message à RabbitMQ
  sendMessage('orderQueue', JSON.stringify(order));
  
  res.json(order);
};

export const updateOrder = async (req: Request, res: Response) => {
  const { customer_id, product_id, quantity } = req.body;
  await db.query('UPDATE orders SET customer_id = ?, product_id = ?, quantity = ? WHERE id = ?', [customer_id, product_id, quantity, req.params.id]);
  const order = { id: req.params.id, customer_id, product_id, quantity };

  // Envoyer un message à RabbitMQ
  sendMessage('orderQueue', JSON.stringify(order));
  
  res.json(order);
};

export const deleteOrder = async (req: Request, res: Response) => {
  await db.query('DELETE FROM orders WHERE id = ?', [req.params.id]);

  // Envoyer un message à RabbitMQ
  sendMessage('orderQueue', JSON.stringify({ id: req.params.id, deleted: true }));
  
  res.status(204).send();
};
