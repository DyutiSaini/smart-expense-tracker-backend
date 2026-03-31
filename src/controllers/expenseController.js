import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHnadler.js";
import { Expense } from "../models/expense.models.js";

const expenseControl = asyncHandler(async (req, res) => {
  const { title, amount, date, category, description } = req.body;
  if (!title || !amount || amount <= 0) {
    throw new ApiError(
      400,
      "Both expense name and amount must required along with all fields",
    );
  }
  const expenseCreate = await Expense.create({
    title,
    amount,
    category,
    description,
    date,
    user: req.user._id,
  });
  res.status(201).json({
    success: true,
    message: "Expense created successfully",
    expenseCreate,
  });
});
export { expenseControl };
