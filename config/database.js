import { Sequelize } from "sequelize";

// Creamos la instancia de Sequelize
export const sequelize = new Sequelize({
  dialect: "sqlite",       // Tipo de base de datos
  storage: "./database.sqlite", // Archivo donde se guardarán los datos
  logging: false,          // Evita mostrar SQL en consola
});
