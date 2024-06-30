import { DataTypes, UUIDV4 } from 'sequelize';
import db from '../config/Database.js';

const Subjudul = db.define('Subjudul', {
  _id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  subjudul: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
  },
  path: {
    type: DataTypes.STRING,
  }
});

const Judul = db.define('Judul', {
  _id: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
  }
});

Judul.hasMany(Subjudul, { as: 'subjudul', foreignKey: 'judulId', onDelete: 'CASCADE', hooks: true });
Subjudul.belongsTo(Judul, { foreignKey: 'judulId', onDelete: 'CASCADE', hooks: true });


Judul.sync({ alter: true });
Subjudul.sync({ alter: true });

export { Judul, Subjudul };
