const { Borrow, User, Book } = require('../models');

const borrowBook = async (req, res) => {
  const { userId, bookId } = req.params;  

  // Kullanıcıyı bul
  const user = await User.findByPk(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  // Kitabı bul
  const book = await Book.findByPk(bookId);
  if (!book) return res.status(404).json({ error: 'Book not found' });

  // Kullanıcının daha önce aynı kitabı ödünç alıp almadığını kontrol et
  const existingBorrow = await Borrow.findOne({
    where: { UserId: userId, BookId: bookId, returnDate: null } // returnDate null olanları kontrol et
  });

  if (existingBorrow) {
    return res.status(400).json({ error: 'User has already borrowed this book and has not returned it yet' });
  }

  // Ödünç al işlemi
  const borrow = await Borrow.create({ UserId: userId, BookId: bookId });

  res.status(201).json(borrow);  // Başarıyla ödünç alındığında yanıt döneriz
};

const returnBook = async (req, res) => {
  const { borrowId } = req.params; 
  const { score } = req.body; 

  // Borç kaydını bulma
  const borrow = await Borrow.findByPk(borrowId);

  if (!borrow) return res.status(404).json({ error: 'Borrow record not found' });

  // Kullanıcıyı ve kitabı kontrol et
  const user = await User.findByPk(borrow.UserId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const book = await Book.findByPk(borrow.BookId);
  if (!book) return res.status(404).json({ error: 'Book not found' });

  // Eğer kitap zaten iade edilmişse, tekrar iade edilemez
  if (borrow.returnDate) {
    return res.status(400).json({ error: 'This book has already been returned' });
  }

  // Kitap iade işlemi
  borrow.returnDate = new Date();
  if (score) borrow.score = score;

  await borrow.save();

  // Kitapla ilgili puan hesaplaması
  if (score) {
    book.totalScore += score;
    book.ratingCount += 1;
    book.averageScore = book.totalScore / book.ratingCount;
    await book.save();
  }

  res.json(borrow);  // Kitap iade işlemi tamamlandığında yanıt döneriz
};

module.exports = { borrowBook, returnBook };
