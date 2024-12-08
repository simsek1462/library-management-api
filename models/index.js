const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
});

const Book = sequelize.define('Book', {
  name: { type: DataTypes.STRING, allowNull: false },
  averageScore: { type: DataTypes.FLOAT, defaultValue: 0 },
  totalScore: { type: DataTypes.INTEGER, defaultValue: 0 },
  ratingCount: { type: DataTypes.INTEGER, defaultValue: 0 },
});

const Borrow = sequelize.define('Borrow', {
  returnDate: { type: DataTypes.DATE, allowNull: true },
  score: { type: DataTypes.INTEGER, allowNull: true },
});

User.hasMany(Borrow);
Borrow.belongsTo(User);

Book.hasMany(Borrow);
Borrow.belongsTo(Book);

module.exports = { sequelize, User, Book, Borrow };
