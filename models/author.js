const { model, Schema } = require("mongoose");

const AuthorSchema = new Schema({
  name: { type: String },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

const Author = model("Author", AuthorSchema);
module.exports = Author;
