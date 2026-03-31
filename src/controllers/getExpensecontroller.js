import { Expense } from "../models/expense.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHnadler.js";

const getExpense = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const expenses = await Expense.find({ user: userId }).sort({
    createdAt: -1,
  });
  res.status(200).json({
    success: true,
    count: expenses.length,
    expenses,
  });
});
export { getExpense };
