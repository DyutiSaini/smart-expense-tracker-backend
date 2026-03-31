import { User } from "../models/user.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHnadler.js";

const register = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    throw new ApiError(400, "All the Fields are required");
  }
  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (existingUser) {
    throw new ApiError(409, "User already exist");
  }
  const user = await User.create({ username, password, email });
  const createdUser = await User.findOne(user._id).select(
    "-password -refreshToken",
  );
  res.status(200).json({
    success: true,
    message: "User regustered successfully",
    user: createdUser,
  });
});
export { register };
