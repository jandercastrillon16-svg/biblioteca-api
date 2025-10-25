import express from "express";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
const router = express.Router();

// 📍 POST /auth/register
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    // Validar que todos los campos existan
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Faltan campos obligatorios." });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "El email ya está registrado." });
    }

    // Crear usuario
    const newUser = await User.create({ fullName, email, password, role });

    // No mostrar la contraseña en la respuesta
    const userWithoutPassword = {
      id: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,
      role: newUser.role,
    };

    res.status(201).json({
      message: "Usuario registrado correctamente.",
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar el usuario", error: error.message });
  }
});
// Clave secreta para JWT (puedes usar la del .env)
const SECRET_KEY = process.env.SECRET_KEY || "mi_clave_secreta";

// 📍 POST /auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar que existan email y password
    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña son obligatorios." });
    }

    // Buscar usuario por email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado." });
    }

    // Verificar contraseña
    const isValid = await user.validPassword(password);
    if (!isValid) {
      return res.status(401).json({ message: "Contraseña incorrecta." });
    }

    // Generar token JWT
    const payload = {
      sub: user.fullName,
      email: user.email,
      role: user.role
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    res.json({
      access_token: token,
      token_type: "bearer"
    });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
  }
});

export default router;
