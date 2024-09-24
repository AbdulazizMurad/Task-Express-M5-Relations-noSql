const Author = require("../../models/author");

const getAllAuthors = async (req, res, next) => {
  try {
    // Fetch authors and populate their posts
    const authors = await Author.find().populate("posts");
    res.json(authors);
  } catch (error) {
    next(error);
  }
};

const getAuthorById = async (req, res, next) => {
  try {
    // Fetch author by ID and populate their posts
    const author = await Author.findById(req.params.authorId).populate("posts");
    if (author) {
      res.json(author);
    } else {
      res.status(404).json({ message: "Author not found" });
    }
  } catch (error) {
    next(error);
  }
};

const createAuthor = async (req, res, next) => {
  try {
    const newAuthor = await Author.create(req.body);
    return res.status(201).json({ newAuthor });
  } catch (error) {
    next(error);
  }
};
module.exports = { getAllAuthors, getAuthorById, createAuthor };
