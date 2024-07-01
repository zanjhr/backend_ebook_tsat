import { Sequelize } from "sequelize";

// const db = new Sequelize({
//     dialect: "mysql",
//     host: "localhost",
//     username: "root",
//     password: "",
//     database: 'auth_db'
// });

const sequelize = new Sequelize({
    host: process.env.DB_HOST, 
    user: process.env.DB_USERNAME, 
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.APP_PORT,
    dialect: "mysql",
});

module.exports = sequelize

// export default db;