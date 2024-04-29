import catchAsync from "../utils/catchAsync";

const postBlog = catchAsync(async (req, res) => {
  const { ...blogData } = req.body;
  const file = req.file;
});
