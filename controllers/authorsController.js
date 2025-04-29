const Author = require('../models/authorModel');

// Create Author
const createAuthor = async (req, res) => {
  try {
    const { name, email, country } = req.body;

    const existingAuthor = await Author.findOne({ email });
    if (existingAuthor) {
      return res.status(400).json({ message: 'Author already exists' });
    }

    const author = new Author({ name, email, country });
    await author.save();

    res.status(201).json(author);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Authors
const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Single Author (Optional)
const getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    res.status(200).json(author);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createAuthor, getAllAuthors, getAuthorById };
