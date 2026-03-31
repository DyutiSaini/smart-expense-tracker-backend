import { Expense } from "../models/expense.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHnadler.js";

const updatecontroller = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const expense = await Expense.findById(id);
  if (!expense) {
    throw new ApiError(404, "Expense not found");
  }
  if (expense.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not authorized");
  }

  if (req.body.title) expense.title = req.body.title;

  if (req.body.amount !== undefined) {
    if (req.body.amount <= 0) {
      throw new ApiError(400, "Amount must be greater than 0");
    }
    expense.amount = req.body.amount;
  }

  if (req.body.category) expense.category = req.body.category;
  if (req.body.description) expense.description = req.body.description;
  if (req.body.date) expense.date = req.body.date;
  await expense.save();
  res.status(200).json({
    success: true,
    message: "Update successFully",
    expense,
  });
});
export { updatecontroller };
