// import { DataTypes, UUIDV4 } from "sequelize";
// import db from "../config/Database.js";
// import Judul from "./judulModel.js"; // Adjust the path based on your file structure

// const Subjudul = db.define('Subjudul', {
//     _id: {
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         primaryKey: true,
//     },
//     subjudul: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     name: {
//         type: DataTypes.STRING,
//         allowNull: true,

//     },
//     path: {
//         type: DataTypes.STRING,
//         allowNull: true,
//     },
// });

// Subjudul.belongsTo(Judul, { foreignKey: 'judulId' });

// export default Subjudul;