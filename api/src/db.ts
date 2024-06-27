// src/db.ts
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config()
// Create the connection to database swag
const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

export default db;