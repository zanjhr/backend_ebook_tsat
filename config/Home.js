import { Sequelize } from "sequelize";

const dbHome = new Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "root",
    password: "",
    database: "db_home",
});

export default dbHome;