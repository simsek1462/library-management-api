const Joi = require('joi');

const validateBorrow = (req, res, next) => {
  const schema = Joi.object({
    userId: Joi.number().integer().required(),
    bookId: Joi.number().integer().required(),
  });

  const { error } = schema.validate(req.params);
  if (error) return res.status(400).json({ error: error.details[0].message });

  next();
};

const validateReturn = (req, res, next) => {
  const schema = Joi.object({
    score: Joi.number().integer().min(1).max(10).optional(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  next();
};

module.exports = { validateBorrow, validateReturn };
