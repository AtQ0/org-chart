import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production'; // Check if in production

console.log('Database connection string: ', process.env.PGURI);

const pool = new Pool({
  connectionString: process.env.PGURI,
  ssl: isProduction ? { rejectUnauthorized: false } : false, // Enable SSL for production, disable for local
});

export default pool;
