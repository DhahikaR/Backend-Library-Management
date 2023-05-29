import express from "express";

import {
  getBooks,
  getBooksById,
  editBook,
  addBook,
  deleteBook,
} from "../controllers/books.js";

import { userVerify } from "../middleware/userVerify.js";

const router = express.Router();

router.get("/books", getBooks);
router.get("/books/:id", getBooksById);
router.patch("/books/:id", editBook);
router.post("/books", addBook);

export default router;
