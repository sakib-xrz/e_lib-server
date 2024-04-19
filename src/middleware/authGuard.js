import jwt from "jsonwebtoken";

import { config } from "../config/config.js";
import ApiError from "../error/ApiError.js";

import User from "../model/User.js";

const authGuard = (...roles) => {
  return async (req, res, next) => {
    try {
      // Get token from request headers, ensuring 'Authorization' is present
      const bearerToken = req.headers.authorization;
      if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
        throw new ApiError(401, "Invalid or missing authorization header");
      }

      // Extract token from bearer token
      const token = bearerToken.split(" ")[1]; // Fix: Handle cases with extra spaces

      const secret = config.jwtSecret;

      // Verify token
      const decoded = jwt.verify(token, secret);
      req.user = decoded;

      const user = await User.findById(decoded._id);

      if (!user) {
        throw new ApiError(401, "User not found");
      }

      if (user.status !== "active") {
        throw new ApiError(401, "User is not active");
      }

      // Check if user has the required role (if any roles provided)
      if (roles.length && !roles.includes(req.user.role)) {
        throw new ApiError(
          403,
          "You don't have permission to access this route"
        );
      }

      next();
    } catch (error) {
      next(error); // Pass error to error handling middleware
    }
  };
};

export default authGuard;
