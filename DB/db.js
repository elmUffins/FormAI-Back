import pg from "pg";
const { Client } = pg;
import 'dotenv/config';

const client = new Client({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    port: 5432,
    ssl: true
});

client.connect();
