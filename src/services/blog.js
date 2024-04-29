import fs from "node:fs";

import Blog from "../model/Blog.js";
import cloudinary from "../utils/cloudinary.js";
import { generateSlug, parsedTags } from "../utils/helpers.js";
import ApiError from "../error/ApiError.js";

const handlePostBlog = async (blogData, file) => {
  let { title, content, tags, author } = blogData;

  if (!title || !content || !tags || !author) {
    throw new ApiError(400, "All fields are required");
  }

  const parsedAuthor = JSON.parse(author);
  const { name, email, profile_picture } = parsedAuthor;

  const slug = generateSlug(title);

  tags = parsedTags(tags);

  const date = new Date();
  const today = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  const filePath = file.path;
  const fileName = `${today}-${file.originalname}`;
  const type = file.mimetype;

  const uploadResult = await cloudinary.uploader.upload(filePath, {
    folder: "banners/",
    filename_override: fileName,
    format: type.split("/").at(-1),
    public_id: slug,
    overwrite: true,
    invalidate: true,
  });

  const blog = {
    title,
    slug,
    content,
    banner: uploadResult.secure_url,
    author: {
      name,
      email,
      profile_picture,
    },
    tags,
  };

  const newBlog = await Blog.create(blog);

  await fs.promises.unlink(filePath);

  return newBlog;
};

const BlogService = {
  handlePostBlog,
};

export default BlogService;
