import { Sequelize } from "sequelize";

const db = new Sequelize({
    dialect: "mysql",
    host: "bqd2qvtqnw3nn6x4lylz-mysql.services.clever-cloud.com",
    username: "ufwxtahjsttqa07q",
    password: "OcJyRHnYm8OBJVlu4129",
    database: 'bqd2qvtqnw3nn6x4lylz'
});

export default db;