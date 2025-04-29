const mongoose = require('mongoose'); // This lets us interact with MongoDB

const Schema = mongoose.Schema;

const booksModel = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' }, // Link to Author
});

module.exports = mongoose.model('Books', booksModel);
