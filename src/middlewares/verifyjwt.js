import { User } from "../models/user.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHnadler.js";
import jwt from "jsonwebtoken";

const verify = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    throw new ApiError(401, "unauthorized token");
  }
  const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const user = await User.findById(decode.userId).select(
    "-password -refreshToken",
  );
  if (!user) {
    throw new ApiError(401, "Invalid Access Token");
  }
  req.user = user;
  next();
});
export { verify };
