import BlogService from "../services/blog.js";
import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";

const postBlog = catchAsync(async (req, res) => {
  const { ...blogData } = req.body;
  const file = req.file;

  const result = await BlogService.handlePostBlog(blogData, file);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Blog posted successfully",
    data: result,
  });
});

const BlogController = {
  postBlog,
};

export default BlogController;
