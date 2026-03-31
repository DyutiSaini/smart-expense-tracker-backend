import { User } from "../models/user.js";
import { asyncHandler } from "../utils/asyncHnadler.js";

const logout = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  await User.findByIdAndUpdate(
    userId,
    { $unset: { refreshToken: 1 } },
    { new: true },
  );
  const cookieOptions = {
    http: true,
    secure: true,
  };
  (res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions),
    json({
      success: true,
      message: "Logout successfully",
    }));
});
export { logout };
