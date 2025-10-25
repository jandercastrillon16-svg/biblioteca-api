import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import { sequelize } from "../config/database.js";

// Definición del modelo de Usuario
export const User = sequelize.define("User", {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false, // obligatorio
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // no puede repetirse
    validate: {
      isEmail: true, // valida formato de correo
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("user", "admin"),
    defaultValue: "user", 
  },
});


User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});


User.prototype.validPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
