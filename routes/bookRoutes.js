const express = require('express');
const { getAllBooks, createBook, getBookById } = require('../controllers/bookController');
const validateBook = require('../validators/bookValidator');

const router = express.Router();

router.get('/', getAllBooks);  
router.post('/', validateBook, createBook);
router.get('/:id', getBookById);

module.exports = router;
