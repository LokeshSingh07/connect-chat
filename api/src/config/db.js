import mongoose from "mongoose";
import { DB_NAME } from '../constants.js';

const connectDB = async()=>{
    try{
        const url = `${process.env.MONGODB_URL}/${DB_NAME}`;
        await mongoose.connect(url);

        console.log("✅ MongoDB connected Successfully");
    }
    catch(err){
        console.log("⚠️ MONGODB connection failed ", err);
        process.exit(1);
    }
}

export { connectDB };