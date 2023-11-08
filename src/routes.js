/* eslint-disable linebreak-style */
const { Router } = require("express");
const schemaValidator = require("../src/apps/middlewares/schemaValidator");

const AuthenticationMiddleware = require("../src/apps/middlewares/authentication");

const userSchema = require("../src/schema/create.user.schema.json");
const UserController = require("./apps/controllers/UserController");

const AuthenticationController = require("./apps/controllers/AuthenticationController");
const authSchema = require("../src/schema/auth.schema.json");

const { upload } = require("./configs/multer");
const FileController = require("./apps/controllers/FileController");

const PostsSchema = require("../src/schema/create.posts.schema.json");
const PostsController = require("./apps/controllers/PostsController");

const routes = new Router();

routes.post("/user", schemaValidator(userSchema), UserController.create);

routes.post("/auth", schemaValidator(authSchema), AuthenticationController.authenticate);

routes.use(AuthenticationMiddleware);

routes.put("/user", UserController.update);

routes.delete("/user", UserController.delete);

routes.get("/user-profile", UserController.userProfile);

routes.post("/upload", upload.single("image"), FileController.upload);

routes.post("/post", schemaValidator(PostsSchema), PostsController.create);

routes.delete("/post/:id", PostsController.delete);

routes.put("/post/:id", PostsController.update);

routes.put("/add-like/:id", PostsController.addLike);

routes.get("/list-my-posts", PostsController.listMyPosts);

routes.get("/list-all-posts", PostsController.listAllPosts);

routes.get("/health", (req, res) =>
  res.send({
    message: "Connected with success in port 3000",
  })
);

module.exports = routes;
