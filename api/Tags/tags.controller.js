const Tag = require("../../models/tag");

const createTag = async (req, res, next) => {
  try {
    const newTag = await Tag.create(req.body);
    return res.status(201).json({ newTag });
  } catch (error) {
    next(error);
  }
};
const getTag = async (req, res, next) => {
  try {
    const tagData = await Tag.find().populate("posts");
    return res.status(200).json({ tagData });
  } catch (error) {
    next(error);
  }
};
module.exports = { createTag, getTag };
