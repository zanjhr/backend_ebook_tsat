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

// import { Sequelize, DataTypes, UUIDV4 } from 'sequelize';
// import db from '../config/Database.js';  // Pastikan jalur ini benar sesuai struktur proyek Anda

// const sequelize = new Sequelize('freedb_db_ebook', 'username', 'password', {
//     host: 'localhost',
//     dialect: 'mysql',
//     dialectOptions: {
//         connectTimeout: 60000 // 60 detik
//     },
//     logging: false // Nonaktifkan logging jika tidak diperlukan
// });

// const Judul = sequelize.define('Judul', {
//     _id: {
//         type: DataTypes.CHAR(36),
//         defaultValue: UUIDV4,
//         primaryKey: true,
//         allowNull: false
//     },
//     title: {
//         type: DataTypes.STRING(255),
//         allowNull: false
//     },
//     createdAt: {
//         type: DataTypes.DATE,
//         defaultValue: Sequelize.NOW,
//         allowNull: false
//     },
//     updatedAt: {
//         type: DataTypes.DATE,
//         defaultValue: Sequelize.NOW,
//         allowNull: false
//     }
// }, {
//     tableName: 'Juduls',
//     timestamps: true,
//     updatedAt: 'updatedAt',
//     createdAt: 'createdAt'
// });

// const Subjudul = sequelize.define('Subjudul', {
//     _id: {
//         type: DataTypes.CHAR(36),
//         defaultValue: UUIDV4,
//         primaryKey: true,
//         allowNull: false
//     },
//     subjudul: {
//         type: DataTypes.STRING(255),
//         allowNull: false
//     },
//     name: {
//         type: DataTypes.STRING(255)
//     },
//     path: {
//         type: DataTypes.STRING(255)
//     },
//     createdAt: {
//         type: DataTypes.DATE,
//         defaultValue: Sequelize.NOW,
//         allowNull: false
//     },
//     updatedAt: {
//         type: DataTypes.DATE,
//         defaultValue: Sequelize.NOW,
//         allowNull: false
//     },
//     judulId: {
//         type: DataTypes.CHAR(36),
//         allowNull: false,
//         references: {
//             model: Judul,
//             key: '_id'
//         }
//     }
// }, {
//     tableName: 'Subjuduls',
//     timestamps: true,
//     updatedAt: 'updatedAt',
//     createdAt: 'createdAt'
// });

// (async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//         await sequelize.sync({ force: true }); // Force sync will drop the table if it exists and create it again
//         console.log('Database synchronized');
//     } catch (error) {
//         console.error('Unable to synchronize the database:', error);
//     }
// })();

// export { Judul, Subjudul };
