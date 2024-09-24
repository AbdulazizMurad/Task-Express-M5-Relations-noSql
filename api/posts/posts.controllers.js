const Author = require("../../models/author");
const Post = require("../../models/Post");

exports.fetchPost = async (postId, next) => {
  try {
    const post = await Post.findById(postId);
    return post;
  } catch (error) {
    next(error);
  }
};

exports.postsCreate = async (req, res) => {
  try {
    const { authorId } = req.params;
    const postData = {
      ...req.body,
      author: authorId,
    };
    const newPost = await Post.create(postData);
    //pushing to the author array:
    const author = await Author.findByIdAndUpdate(authorId, {
      $push: { posts: newPost },
    });
    return res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.postsDelete = async (req, res) => {
  try {
    await Post.findByIdAndRemove({ _id: req.post.id });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.postsUpdate = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.post.id, req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.postsGet = async (req, res, next) => {
  try {
    // Fetch posts and populate the author field
    const posts = await Post.find().populate("author", "name"); // Only fetch the 'name' field of the author
    res.json(posts);
  } catch (error) {
    next(error);
  }
};
