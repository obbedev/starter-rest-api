let db;
import pkg from 'pg';
const { Pool } = pkg;

export async function createConnection() {
  db = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASS,
      port: process.env.DB_PORT,
  });
}

export const getConnection = () => db;
