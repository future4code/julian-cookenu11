import dotenv from 'dotenv';
import knex from 'knex';

dotenv.config();

const connection = knex({
    dialect: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT)
    }
});

export default connection;