import express from "express";
const blogRoutes = express.Router();

blogRoutes.post("/", BlogController.postBlog);

export default blogRoutes;
