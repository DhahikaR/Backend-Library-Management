import express from "express";

import {
  getBooks,
  getBooksById,
  editBook,
  addBook,
  deleteBook,
  checkBook,
} from "../controllers/books.js";

const router = express.Router();

router.get("/books", getBooks);
router.get("/books/:id", getBooksById);
router.patch("/books/:id", editBook);
router.post("/books", addBook);
router.delete("/books/:id", deleteBook);
router.put("/books/:id", checkBook);

export default router;
