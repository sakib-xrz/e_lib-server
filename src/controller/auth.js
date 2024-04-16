import catchAsync from "../utils/catchAsync.js";
import sendResponse from "../utils/sendResponse.js";

import AuthService from "../services/auth.js";

const register = catchAsync(async (req, res) => {
  const { ...registerData } = req.body;

  const result = await AuthService.handleRegister(registerData);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Registration successful",
    data: {
      access: result.token,
    },
  });
});

const login = catchAsync(async (req, res) => {
  const { ...loginData } = req.body;

  const result = await AuthService.handleLogin(loginData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Login successful",
    data: {
      access: result.token,
    },
  });
});

const AuthController = {
  register,
  login,
};

export default AuthController;
