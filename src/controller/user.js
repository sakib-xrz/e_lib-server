import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";

import MeService from "../services/user.js";
import cloudinary from "../utils/cloudinary.js";

const getUser = catchAsync(async (req, res) => {
  const user = req.user;

  const result = await MeService.handleGetUser(user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User data retrieved successfully",
    data: result,
  });
});

const updateProfilePicture = catchAsync(async (req, res) => {
  const date = new Date();
  const today = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  const filePath = req.file.path;
  const fileName = `${today}-${req.file.originalname}`;
  const type = req.file.mimetype;

  const uploadResult = await cloudinary.uploader.upload(filePath, {
    folder: "profile-pictures",
    filename_override: fileName,
    format: type.split("/").at(-1),
  });

  console.log(uploadResult);
});

const UserController = {
  getUser,
  updateProfilePicture,
};

export default UserController;
