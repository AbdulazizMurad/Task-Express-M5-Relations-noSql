const Author = require("../../models/author");
const Post = require("../../models/Post");
const Tag = require("../../models/tag");

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
    const { postId } = req.params;
    //updating tags: go to tag and push to it posts: "post id"
    const updatedTagsInPosts = await Tag.updateMany(
      { _id: req.body.tags },
      { $push: { posts: postId } }
    );

    //updating the post to include the tags:
    const updatedPost = await Post.findByIdAndUpdate(postId, {
      $push: { tags: { $each: req.body.tags } },
    });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.postsGet = async (req, res, next) => {
  try {
    // Fetch posts and populate the author field
    const posts = await Post.find().populate("tags");
    res.json(posts);
  } catch (error) {
    next(error);
  }
};
