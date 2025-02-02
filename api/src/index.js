import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./config/db.js";
import { logger } from "./utils/Logger.js";


dotenv.config({
    path: './env'
});
const PORT = process.env.PORT || 4000; 




connectDB()
.then(()=>{
    app.on("error", (err)=>{
        console.log("Server error: ", error.message);
        throw err;
    })

    app.listen(PORT, ()=>{
        logger(`✅ Your server is up and running...`);
    })

    app.get("/", (req,res)=>{
        return res.status(200).json({
            success: true,
            message: "Your server is up and running..."
        });
    })
})
.catch((err) => console.log("⚠️ MongoDB connection failed"));



