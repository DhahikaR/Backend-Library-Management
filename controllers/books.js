import Book from "../models/bookModel.js";
import Users from "../models/userModel.js";

export const getBooks = async (req, res) => {
  try {
    const book = await Book.findAll({
      attributes: [
        "judul",
        "pengarang",
        "penerbit",
        "tahun_terbit",
        "halaman",
        "isbn",
      ],
    });
    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({ msg: "Not Found" });
  }
};

export const getBooksById = async (req, res) => {
  try {
    const book = await Book.findOne({
      attributes: [
        "judul",
        "pengarang",
        "penerbit",
        "tahun_terbit",
        "halaman",
        "isbn",
      ],
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({ msg: "Not Found" });
  }
};

export const editBook = async (req, res) => {
  const book = await Book.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!book) return res.status(404).json({ msg: "Not Found" });
  const { judul, pengarang, penerbit, tahun_terbit, halaman, isbn } = req.body;
  try {
    await Book.update(
      {
        judul: judul,
        pengarang: pengarang,
        penerbit: penerbit,
        tahun_terbit: tahun_terbit,
        halaman: halaman,
        isbn: isbn,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Edit Successfull!" });
  } catch (error) {
    res.status(500).json({ msg: error.msg });
  }
};

export const addBook = async (req, res) => {
  const { judul, pengarang, penerbit, tahun_terbit, halaman, isbn } = req.body;
  try {
    await Book.create({
      judul: judul,
      pengarang: pengarang,
      penerbit: penerbit,
      tahun_terbit: tahun_terbit,
      halaman: halaman,
      isbn: isbn,
      userId: req.userId,
    });
    res.status(200).json({ msg: "Input Data Successfull!!" });
  } catch (error) {
    res.status(500).json({ msg: error.msg });
  }
};

export const deleteBook = async (req, res) => {
  const book = await Book.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!book) return res.status(404).json({ msg: "Not Found" });
  try {
    await Book.destroy({
      where: {
        id: book.id,
      },
    });
    res.status(200).json({ msg: "Delete Successfull!!" });
  } catch (error) {
    res.status(500).json({ msg: error.msg });
  }
};
