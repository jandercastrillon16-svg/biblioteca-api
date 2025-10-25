import express from "express";
import { Book } from "../models/book.js";
import { getCurrentUser } from "../middlewares/auth.js";
import authorizeRole from "../middlewares/authorizeRole.js";

const router = express.Router();

// GET /books → listar todos los libros
router.get("/", getCurrentUser, async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
});

// POST /books → crear un libro (solo admin)
router.post("/", getCurrentUser, authorizeRole("admin"), async (req, res) => {
  try {
    const { titulo, autor, ano_publicacion, en_stock } = req.body;
    const newBook = await Book.create({ titulo, autor, ano_publicacion, en_stock });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el libro", error: error.message });
  }
});

// GET /books/:id → ver un libro
router.get("/:id", getCurrentUser, async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (!book) return res.status(404).json({ message: "Libro no encontrado" });
  res.json(book);
});

// PUT /books/:id → editar un libro
router.put("/:id", getCurrentUser, async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ message: "Libro no encontrado" });

    const { titulo, autor, ano_publicacion, en_stock } = req.body;
    await book.update({ titulo, autor, ano_publicacion, en_stock });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el libro", error: error.message });
  }
});

// DELETE /books/:id → eliminar un libro (solo admin)
router.delete("/:id", getCurrentUser, authorizeRole("admin"), async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ message: "Libro no encontrado" });

    await book.destroy();
    res.json({ message: "Libro eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el libro", error: error.message });
  }
});

export default router;
