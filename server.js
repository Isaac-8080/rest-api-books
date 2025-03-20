const express = require('express');

const app = express();

const PORT = 6030;

const DB = [];

app.use(express.json());

app.post('/api/books', (req, res) => {

  const { title, author, description } = req.body;

  if (!title || !author || !description)
  return res.status(400).json({msg : `feild can't be empty`});

  const newBook = {
    id: DB.length + 1,
    title, 
    author, 
    description
  };

  DB.push(newBook);
  return res.status(200).json({
    msg : `book created successfully`, 
    bookDetails : newBook
  });
});

app.get('/api/books', (req, res) => {

  // res.json(DB);
  return res.status(200).json({
    msg : `book fetched successfully`, 
    bookDetails : DB
  });

});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
})