import { User } from "../models/user.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHnadler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import cookieParser from "cookie-parser";

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "Both the fields are required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const ispasswordCorrect = await bcrypt.compare(password, user.password);
  if (!ispasswordCorrect) {
    throw new ApiError(401, "Invalid credential");
  }
  // const accessToken = user.generateAccessToken();
  // const refreshToken = user.generateRefreshToken();

  const accessToken = jwt.sign(
    { id: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY },
  );

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };
  res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json({
      success: true,
      message: "User Logined successFully",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
});
export { login };
