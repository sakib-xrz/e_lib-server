import jwt from "jsonwebtoken";

import { config } from "../config/config.js";
import ApiError from "../error/ApiError.js";

import User from "../model/User.js";

const authGuard = (...roles) => {
  async (req, _res, next) => {
    try {
      // get token from request headers
      const bearerToken = req.headers.authorization;

      // check if token exists
      if (!bearerToken) {
        throw new ApiError(401, "You are not authorized to access this route");
      }

      // extract token from bearer token
      const token = bearerToken.split(" ")[1];

      const secret = config.jwtSecret;

      // verify token
      const decoded = jwt.verify(token, secret);
      req.user = decoded;

      const user = await User.findById(decoded._id);

      if (!user) {
        throw new ApiError(401, "You are not authorized to access this route");
      }

      if (user.status !== "active") {
        throw new ApiError(401, "You are not authorized to access this route");
      }

      // check if user has the required role
      if (roles.length && !roles.includes(req.user.role)) {
        throw new ApiError(
          403,
          "You don't have permission to access this route"
        );
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default authGuard;
