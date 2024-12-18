const { Borrow, User, Book } = require('../models');

const borrowBook = async (req, res) => {
    const { userId, bookId } = req.params;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const book = await Book.findByPk(bookId);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    const existingBorrow = await Borrow.findOne({
        where: { BookId: bookId, returnDate: null },
    });

    if (existingBorrow) {
        return res.status(400).json({ error: 'This book is currently borrowed by another user and not yet returned' });
    }

    const userBorrowedBook = await Borrow.findOne({
        where: { UserId: userId, BookId: bookId, returnDate: null }
    });

    if (userBorrowedBook) {
        return res.status(400).json({ error: 'User has already borrowed this book and has not returned it yet' });
    }

    const borrow = await Borrow.create({ UserId: userId, BookId: bookId });

    res.status(201).json(borrow);
};

const returnBook = async (req, res) => {
    const { borrowId } = req.params;
    const { score } = req.body;

    const borrow = await Borrow.findByPk(borrowId);

    if (!borrow) return res.status(404).json({ error: 'Borrow record not found' });

    const user = await User.findByPk(borrow.UserId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const book = await Book.findByPk(borrow.BookId);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    if (borrow.returnDate) {
        return res.status(400).json({ error: 'This book has already been returned' });
    }

    borrow.returnDate = new Date();
    if (score) borrow.score = score;

    await borrow.save();

    if (score) {
        book.totalScore += score;
        book.ratingCount += 1;
        book.averageScore = book.totalScore / book.ratingCount;
        await book.save();
    }

    res.json(borrow);
};

module.exports = { borrowBook, returnBook };
