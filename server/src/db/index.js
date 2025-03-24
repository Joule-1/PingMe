import { DB_NAME } from "../constants.js";
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`
        );
        console.log("Database Connected: ", connectionInstance.connection.host);
    } catch (error) {
        console.log("MongoDB Connection Failed !!", error);
    }
};

export default connectDB;
