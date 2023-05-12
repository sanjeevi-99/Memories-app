import express from "express";

import { getPosts, getPost, getPostsBySearch, createPost, updatePost, deletePost, likePost, commentPost } from "./posts.controller.js";
import auth from "../../middleware/auth.js";

const postRoutes = express.Router();

postRoutes.get("/search", getPostsBySearch);
postRoutes.get("/", getPosts);
postRoutes.get("/:id", getPost); // routes with id need to come after other routes

postRoutes.post("/", auth, createPost);
postRoutes.post("/:id/commentPost", auth, commentPost);

postRoutes.delete("/:id", auth, deletePost);

postRoutes.patch("/:id", auth, updatePost);
postRoutes.patch("/:id/likePost", auth, likePost);

export default postRoutes;
