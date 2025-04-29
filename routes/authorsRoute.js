const express = require('express');
const {
  createAuthor,
  getAllAuthors,
  getAuthorById
} = require('../controllers/authorsController');

const router = express.Router();

router.post('/create', createAuthor);
router.get('/all', getAllAuthors);
router.get('/:id', getAuthorById); // optional

module.exports = router;
