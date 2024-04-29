import express from "express";
import BlogController from "../../controller/blog.js";
import uploader from "../../middleware/uploader.js";
import authGuard from "../../middleware/authGuard.js";
const blogRoutes = express.Router();

blogRoutes.post(
  "/",
  authGuard(),
  uploader.single("banner"),
  BlogController.postBlog
);

export default blogRoutes;
