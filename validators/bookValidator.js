const Joi = require('joi');

const validateBook = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  next();
};

module.exports = validateBook;
