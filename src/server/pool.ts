import dotenv from 'dotenv';
import { Pool } from 'pg';
import 'server-only';

dotenv.config(); // doesn't override existing env vars

if (!process.env.PGURI) {
  throw new Error(
    'PGURI is not set. Define it in .env.local or in docker-compose.',
  );
}

// mask password before logging
const masked = process.env.PGURI.replace(
  /:\/\/([^:]+):[^@]+@/,
  '://$1:******@',
);
console.log('DB connection:', masked);

const isProduction = process.env.NODE_ENV === 'production';

declare global {
  // eslint-disable-next-line no-var
  var pgPool: Pool | undefined;
}

// Reuse in dev to avoid too many connections during HMR
const pool =
  global.pgPool ??
  new Pool({
    connectionString: process.env.PGURI,
    ssl: isProduction ? { rejectUnauthorized: false } : false,
  });

if (!isProduction) global.pgPool = pool;

export default pool;
