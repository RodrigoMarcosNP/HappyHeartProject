import { config } from '@src/config/config';
import pg from 'pg';

let PORT = 0;

if(typeof config.DB_PORT == 'number') {
  PORT = config.DB_PORT;
}

const db = new pg.Pool({
  host: config.DB_HOST,
  port: PORT,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME
})

export default db;