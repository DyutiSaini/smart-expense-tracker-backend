import mongoose from "mongoose";
const connectdb = async (req, res) => {
  try {
    const connectInstance = await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongodb connected : ", connectInstance.connection.host);
  } catch (error) {
    console.log("Mongodb connection is failed", error);
    process.exit(1);
  }
};
export default connectdb;
