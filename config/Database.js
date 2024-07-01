// import { Sequelize } from "sequelize";
const { Sequelize } = require('sequelize');

// const db = new Sequelize({
//     dialect: "mysql",
//     host: "localhost",
//     username: "root",
//     password: "",
//     database: 'auth_db'
// });

// export default db;

const sequelize = new Sequelize({
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
});

module.exports = sequelize;