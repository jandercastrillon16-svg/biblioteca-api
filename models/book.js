import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Book = sequelize.define("Book", {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ano_publicacion: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  en_stock: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});
