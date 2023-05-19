import express from "express";

import {
  getBooks,
  getBooksById,
  editBook,
  addBook,
  deleteBook,
  checkBook,
} from "../controllers/books.js";

import { userVerify } from "../middleware/userVerify.js";

const router = express.Router();

router.get("/books", userVerify, getBooks);
router.get("/books/:id", userVerify, getBooksById);
router.patch("/books/:id", userVerify, editBook);
router.post("/books", userVerify, addBook);
router.delete("/books/:id", userVerify, deleteBook);
router.put("/books/:id", userVerify, checkBook);

export default router;
