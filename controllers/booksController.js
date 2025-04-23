const Book = require("../models/booksModel");

const createBook = async (req, res) => {
  
  const { title, author, description } = req.body;

  if (!title || !author || !description )
    return res.status(400).json({ msg: `bad request, all feilds are required` })

  const newBook = Book({
    title, 
    author, 
    description
  })

  await newBook.save();

  return res.status(200).json({ msg: `book added!`, bookDetail : newBook });

}

const getBook = async (req, res) => {

  try {

    const Books = await Book.find();

    if (!Books) 
      return res.status(404).json({msg: "Books not found"});
      
      return res.status(200).json(Books);

  } catch (error) {
    
    console.log("sorry an error occured", error);

  }

}

const getBookByAuthor = async (req, res) => {

  try {

    const author = req.params.author;
    
    const Books = await Book.find({ author });

    if (!Books)
      return res.status(404).json({msg: `no Book with the author "${author}" found`});

      return res.status(201).json(Books);

  } catch (error) {
    
    console.log("error");

  }

  
}

const updateBookById = async (req, res) => {

  const { id } = req.params;

  const { title, author, description } = req.body;

  const newBookDetails = await Book.findByIdAndUpdate(id, {
    title, author, description
  })

  if (!newBookDetails)
    return res.status(404).json({msg: "Book not found"});
  
    return res.status(200).json({msg: `Book updated`, newBookDetails});

}

module.exports = { createBook, getBook, getBookByAuthor, updateBookById }