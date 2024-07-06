import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';

const db = new Sequelize({
  username: 'freedb_zanjhr',
  password: 'M3H?A6ejzrW99fs',
  database: 'freedb_db_ebook',
  dialect: 'mysql',
  dialectModule: mysql2,
  host: 'sql.freedb.tech',
  port: 3306,
  // dialectOptions: {
  //   connectTimeout: 60000, // increase timeout to 60 seconds
  // },
  logging: console.log,
});

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// console.log('DB_HOST:', process.env.DB_HOST);
// console.log('DB_USERNAME:', process.env.DB_USERNAME);
// console.log('DB_NAME:', process.env.DB_NAME);

export default db;
