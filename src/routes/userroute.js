import { Router } from "express";
import { test } from "../controllers/testcontroller.js";
import { register } from "../controllers/registercontroller.js";
import { login } from "../controllers/logincontroller.js";
import { logout } from "../controllers/logoutController.js";
import { refreshAcccessToken } from "../controllers/refreshTokenController.js";

const route = Router();
route.get("/", test);
route.post("/register", register);
route.post("/login", login);
route.post("/logout", logout);
route.post("/refreshAccessToken", refreshAcccessToken);
export { route };
