import dotenv from "dotenv";
dotenv.config();
import { app } from "./app.js";
// import mongoose from "mongoose";
import connectdb from "./db/connectdb.js";
const port = 8000 || process.env.MONGO_URI;
connectdb().then(() => {
  app.listen(port, () => {
    console.log(`server is connecting at port ${port}`);
  });
});
