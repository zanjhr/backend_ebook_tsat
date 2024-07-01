import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';

const db = new Sequelize({
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: 'mysql',
    dialectModule: mysql2,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
});

export default db;
