import { Expense } from "../models/expense.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHnadler.js";

const deletecontroller = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const expense = await Expense.findById(id);
  if (!expense) {
    throw new ApiError(404, "Expense not found");
  }
  if (expense.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not authorized to delete this expense");
  }
  await expense.deleteOne();
  res.status(200).json({
    success: true,
    message: "Expense successfully deleted",
  });
});
export { deletecontroller };
