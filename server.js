import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./config/database.js";
import { User } from "./models/user.js";
import authRoutes from "./routes/auth.js";
import bookRoutes from "./routes/books.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/books", bookRoutes);

// Ruta base
app.get("/", (req, res) => {
  res.json({ message: "📚 Bienvenido a la API de la Biblioteca Virtual" });
});

// Rutas de autenticación
app.use("/auth", authRoutes);

// Sincronizar base de datos
try {
  await sequelize.sync({ alter: true });
  console.log("✅ Base de datos sincronizada correctamente.");
} catch (error) {
  console.error("❌ Error al sincronizar la base de datos:", error);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
