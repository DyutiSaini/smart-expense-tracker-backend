import { Router } from "express";
import { expenseControl } from "../controllers/expenseController.js";
import { verify } from "../middlewares/verifyjwt.js";
import { getExpense } from "../controllers/getExpensecontroller.js";
import { updatecontroller } from "../controllers/updateController.js";
const expenseRoute = Router();
expenseRoute.post("/", verify, expenseControl);
expenseRoute.get("/", verify, getExpense);
expenseRoute.patch("/:id", verify, updatecontroller);

export { expenseRoute };
