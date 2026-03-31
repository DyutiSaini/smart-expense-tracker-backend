import { User } from "../models/user.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHnadler.js";
import jwt from "jsonwebtoken";

const refreshAcccessToken = asyncHandler(async (req, res) => {
  const refreshToken =
    req.cookies?.refreshToken || req.body.refreshAcccessToken;
  if (!refreshToken) {
    throw new ApiError(401, "refresh Token is required");
  }
  const decodedToken = await jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
  );
  const user = await User.findById(decodedToken.userId);
  if (!user || user.refreshToken !== refreshToken) {
    throw new ApiError(401, "Invalid credential");
  }
  const newAccessToken = user.generateAccessToken();
  const cookieOptions = {
    http: true,
    secure: false,
  };
  res.status(200).cookie("newAccessToken", newAccessToken, cookieOptions).json({
    success: true,
    message: "Access token required",
  });
});
export { refreshAcccessToken };
