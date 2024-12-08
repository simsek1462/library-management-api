const express = require('express');
const { getAllUsers, getUserById, createUser } = require('../controllers/userController');
const validateUser = require('../validators/userValidator');

const router = express.Router();

router.get('/', getAllUsers);

router.get('/:id', getUserById);

router.post('/', validateUser, createUser);

module.exports = router;
