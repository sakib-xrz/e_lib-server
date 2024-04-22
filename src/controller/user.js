import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";

import MeService from "../services/user.js";

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

const updateUser = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const { ...updatedUserData } = req.body;

  const result = await MeService.handleUpdateUser(userId, updatedUserData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User data updated successfully",
    data: result,
  });
});

const updateProfilePicture = catchAsync(async (req, res) => {
  const user = req.user;
  const file = req.file;

  const result = await MeService.handleUpdateProfilePicture(user, file);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Profile picture updated successfully",
    data: result,
  });
});

const UserController = {
  getUser,
  updateUser,
  updateProfilePicture,
};

export default UserController;
