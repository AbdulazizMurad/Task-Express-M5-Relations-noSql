const express = require("express");
const {
  getAllAuthors,
  createAuthor,
  getAuthorById,
} = require("./authors.controllers");
const authorRoutes = express.Router();

authorRoutes.get("/", getAllAuthors);
authorRoutes.get("/:authorId", getAuthorById);
authorRoutes.post("/", createAuthor);
module.exports = authorRoutes;
