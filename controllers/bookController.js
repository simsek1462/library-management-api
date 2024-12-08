const { Book } = require('../models');

const getAllBooks = async (req, res) => {
  const books = await Book.findAll({ attributes: ['id', 'name'] });
  res.json(books);
};

const createBook = async (req, res) => {
  const { name } = req.body;
  const book = await Book.create({ name });
  res.status(201).json(book);
};


const getBookById = async (req, res) => {
  const { id } = req.params; 

  const book = await Book.findByPk(id);

  if (!book) {
    return res.status(404).json({ error: 'Book not found' }); 
  }

  res.json(book);
};

module.exports = { getAllBooks, createBook, getBookById };
