import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./config/db.js";


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
        console.log(`🔅 Server running on port ${PORT}\n`);
    })

    app.get("/", (req,res)=>{
        return res.status(200).json({
            success: true,
            message: "Server is running"
        });
    })
})
.catch((err) => console.log("⚠️ MongoDB connection failed"));



