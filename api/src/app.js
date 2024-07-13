import express from "express";
import cors from "cors";

const app  = express();


// --------- Middlewares ---------  
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));




// routes import
import userRoutes from "./routes/user.routes.js";



// routes declaration
app.use("/api/v1/user", userRoutes);




export { app };