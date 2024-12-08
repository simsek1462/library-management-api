const { User, Borrow, Book } = require('../models');

const getAllUsers = async (req, res) => {
  const users = await User.findAll({ attributes: ['id', 'name'] });
  res.json(users);
};

const getUserById = async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    include: { model: Borrow, include: [Book] },
  });
  if (!user) return res.status(404).json({ error: 'User not found' });

  res.json({
    id: user.id,
    name: user.name,
    books: {
      past: user.Borrows.filter(b => b.returnDate).map(b => ({
        name: b.Book.name,
        userScore: b.score,
      })),
      present: user.Borrows.filter(b => !b.returnDate).map(b => ({
        name: b.Book.name,
      })),
    },
  });
};

const createUser = async (req, res) => {
  const { name } = req.body;
  const user = await User.create({ name });
  res.status(201).json(user);
};

module.exports = { getAllUsers, getUserById, createUser };
