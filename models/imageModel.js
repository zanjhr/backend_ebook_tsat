import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Image = db.define("Image", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Image;

(async () => {
  await db.sync();
})();