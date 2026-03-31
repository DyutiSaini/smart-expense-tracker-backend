import { Router } from "express";
import { deletecontroller } from "../controllers/deleteController.js";
import { verify } from "../middlewares/verifyjwt.js";
const deleteroute = Router();
deleteroute.delete("/:id", verify, deletecontroller);
export { deleteroute };
