const Joi = require("joi");

const validateItem = (req, res, next) => {
  try {
    const cartSchema = Joi.object({
      name: Joi.string().min(1).max(30).required(),
      description: Joi.string().max(100).required(),
      quantity: Joi.number().positive().min(1).max(3).required(),
    });
    const { error } = cartSchema.validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    next();
  } catch (err) {
    return res.status(500).send("Internal server error.");
  }
};

const validateItemId = (req, res, next) => {
  try {
    const cartSchema = Joi.object({
      id: Joi.number().positive().required(),
    });
    const { error } = cartSchema.validate(req.params);

    if (error) return res.status(400).send(error.details[0].message);

    next();
  } catch (err) {
    return res.status(500).send("Internal server error.");
  }
};

module.exports = { validateItem, validateItemId };
