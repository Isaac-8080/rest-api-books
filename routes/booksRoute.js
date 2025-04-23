const express = require("express");

const { createBook, getBook, getBookByAuthor, updateBookById } = require("../controllers/booksController");

const Router = express.Router();

Router.post('/create-book', createBook);
Router.get('/get-book', getBook);
Router.get('/get-book/:author', getBookByAuthor);
Router.put('/edit-book', updateBookById);

module.exports = Router;