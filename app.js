const express = require("express");
const app = express();
const postsRoutes = require("./api/posts/posts.routes");
const authorRoutes = require("./api/posts/authors.routes");
const tagRoutes = require("./api/Tags/tags.routes");
const connectDb = require("./database");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config();
const PORT = process.env.PORT;
connectDb();
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/posts", postsRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/tags", tagRoutes);
app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log("The application is running on localhost:8000");
});
