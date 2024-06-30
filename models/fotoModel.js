import { DataTypes } from 'sequelize';
import db from '../config/Database.js';


const FileFoto = db.define('File', {
  nik: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},{
  tableName: 'filefoto'
});

export default FileFoto;

(async()=>{
  await db.sync();
})();