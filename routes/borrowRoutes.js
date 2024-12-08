const express = require('express');
const { borrowBook, returnBook } = require('../controllers/borrowController');
const { validateBorrow, validateReturn } = require('../validators/borrowValidator');

const router = express.Router();

router.post('/:userId/borrow/:bookId', validateBorrow, borrowBook);

router.post('/:userId/return/:borrowId', validateReturn, returnBook);

module.exports = router;
