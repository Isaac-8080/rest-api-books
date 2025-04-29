const mongoose = require('mongoose'); // This lets us interact with MongoDB

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },     // Author's name (must be provided)
  email: { type: String, required: true, unique: true }, // Email (must be unique and required)
  country: { type: String, required: true }   // Country the author is from
});

module.exports = mongoose.model('Author', authorSchema);
