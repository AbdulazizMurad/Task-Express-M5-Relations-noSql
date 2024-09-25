const express = require("express");
const { createTag, getTag } = require("./tags.controller");
const tagRouter = express.Router();

tagRouter.post("/", createTag);
tagRouter.get("/", getTag);
module.exports = tagRouter;
