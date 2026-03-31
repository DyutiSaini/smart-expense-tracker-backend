import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
// import { test } from "./controllers/testcontroller.js";
// import { register } from "./controllers/registercontroller.js";
// import { login } from "./controllers/logincontroller.js";
// import { logout } from "./controllers/logoutController.js";
// import { refreshAcccessToken } from "./controllers/refreshTokenController.js";
// import { Expense } from "./models/expense.models.js";
import { route } from "./routes/userroute.js";
import { expenseRoute } from "./routes/expenseroute.js";
import { deleteroute } from "./routes/deleteroute.js";
// import { connectdb } from "./db/connectdb.js";

const app = express();
//CORS must come first always
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());
app.use(cookieParser());
app.use("/api/v1/user", route);
app.use("/api/v1/expense", expenseRoute);
app.use("/api/v1/expense", deleteroute);
export { app };
