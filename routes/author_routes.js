const express = require('express')
const { AddAuthorValidationMW, UpdateAuthorValidationMW } = require("../validators/author_validator")
const authorController = require("../controllers/author_controller")

const authorRouter = express.Router()

authorRouter.get('/', authorController.getAllAuthors)

authorRouter.get('/:id', authorController.getAuthorByID)

authorRouter.post('/', AddAuthorValidationMW, authorController.addAuthor)

authorRouter.put('/:id', UpdateAuthorValidationMW, authorController.updateAuthor)

authorRouter.delete('/:id', authorController.deleteAuthorByID)

module.exports = authorRouter


