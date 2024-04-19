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

const UserController = {
  getUser,
};

export default UserController;
