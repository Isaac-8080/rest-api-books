const Book = require("../models/booksModel");
const Author = require("../models/authorModel");

const createBook = async (req, res) => {
  const { title, description, author } = req.body;
  
  if (!title || !author || !description)
    return res.status(400).json({ msg: `bad request, all fields are required` });

  const newBook = new Book({
    title,
    description,
    author,
  });

  await newBook.save();

  return res.status(201).json({ msg: `book added!`, bookDetail: newBook });
};

const getBook = async (req, res) => {
  try {
    const Books = await Book.find().populate("author");

    if (!Books || Books.length === 0)
      return res.status(404).json({ msg: "Books not found" });

    return res.status(200).json(Books);
  } catch (error) {
    console.log("sorry an error occurred", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const getBookByAuthor = async (req, res) => {
  try {
    const authorName = req.params.author;

    const authorDoc = await Author.find({ name: authorName });
    if (!authorDoc)
      return res.status(404).json({ msg: `No author named "${authorName}" found` });

    const Books = await Book.find({ author: authorDoc._id }).populate("author");

    if (!Books || Books.length === 0)
      return res.status(404).json({ msg: `No book by author "${authorName}" found` });

    return res.status(200).json(Books);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const updateBookById = async (req, res) => {
  const { id } = req.params;
  const { title, author, description } = req.body;

  const newBookDetails = await Book.findByIdAndUpdate(
    id,
    { title, author, description },
    { new: true }
  );

  if (!newBookDetails)
    return res.status(404).json({ msg: "Book not found" });

  return res.status(200).json({ msg: `Book updated`, newBookDetails });
};

const deleteBooksById = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook)
      return res.status(404).json({ message: 'Book not found' });

    return res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createBook,
  getBook,
  getBookByAuthor,
  updateBookById,
  deleteBooksById,
};
