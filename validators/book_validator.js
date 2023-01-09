const Joi = require("joi");

const BookAddSchema = Joi.object({
  title: Joi.string()
    .min(5)
    .max(255)
    .trim()
    .required(),
  shortDescription: Joi.string()
    .min(5)
    .max(500)
    .trim()
    .optional(),
  longDescription: Joi.string()
    .min(10)
    .trim()
    .optional(),
  year: Joi.number()
    .integer()
    .max(2022)
    .required(),
  isbn: Joi.string()
    .min(10)
    .max(13)
    .required(),
  price: Joi.number()
    .min(0)
    .required(),
  createdAt: Joi.date()
    .default(Date.now),
  lastUpdateAt: Joi.date()
    .default(Date.now),
});

const BookUpdateSchema = Joi.object({
  title: Joi.string()
    .min(5)
    .max(255)
    .trim(),
  shortDescription: Joi.string()
    .min(5)
    .max(500)
    .trim(),
  longDescription: Joi.string()
    .min(10)
    .trim(),
  year: Joi.number()
    .integer()
    .max(2023),
  isbn: Joi.string()
    .min(10)
    .max(13),
  price: Joi.number()
    .min(0),

});

async function AddBookValidationMW(req, res, next) {
  const bookPayload = req.body;

  try {
    await BookAddSchema.validateAsync(bookPayload);
    next();
  } catch (error) {
    next({
      message: error.datails[0].message,
      status: 400,
    });
  }
}

async function UpdateBookValidationMW(req, res, next) {
  const bookPayload = req.body;

  try {
    await BookUpdateSchema.validateAsync(bookPayload);
    next();
  } catch (error) {
    next({
      message: error.datails[0].message,
      status: 400,
    });
  }
}
module.exports = {AddBookValidationMW, UpdateBookValidationMW};
