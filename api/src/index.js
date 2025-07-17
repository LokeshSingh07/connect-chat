import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./config/db.js";
import { logger } from "./utils/Logger.js";
import { Server } from 'socket.io'
import path from "path";
import express from "express";
import fs from "fs";

dotenv.config({
    path: './env'
});
const PORT = process.env.PORT || 4000; 




connectDB()
.then(()=>{
    app.on("error", (err)=>{
        console.log("Server error: ", err.message);
        throw err;
    })

    const server = app.listen(PORT, ()=>{
        logger(`✅ Your server is up and running on PORT ${PORT}`);
    })



    // ======================== Static Frontend ========================
    const __dirname1 = path.resolve();
    const clientBuildPath = path.join(__dirname1, "/client/dist");

    if(process.env.NODE_ENV === "production"){
        if(fs.existsSync(clientBuildPath)){
            app.use(express.static(clientBuildPath));
            
            app.get("*", (req, res) => {
                res.sendFile(path.join(clientBuildPath, "index.html"));
            });
        }
        else{
            console.warn("⚠️ client/build not found. Skipping static file serving.");
        }
    }
    else{
        // check server-health
        app.get("/", (req,res)=>{
            return res.status(200).json({
                success: true,
                message: "Your server is up and running..."
            });
        })
    }





    // ======================== SOCKET.IO Setup ========================
    const io = new Server(server, {
        pingTimeout: 60 * 1000,     // wait for 
        cors: {
            origin: process.env.CORS_ORIGIN,
            methods: ["GET", "POST"]
        }
    })

    io.on('connection', (socket)=>{
        console.log("\n🔌 New client connected: 🔑 Socket ID:", socket.id);             // Unique per connection
        // console.log("📦 Handshake headers:", socket.handshake.headers);  // Useful for auth
        // console.log("🧾 Query params:", socket.handshake.query);        // If you're passing auth data
        // console.log("🧠 User info:", socket.user);


        // Join user-specific private room
        socket.on('setup', (userData)=>{
            socket.join(userData._id)

            console.log("✅User joined private room: ", userData._id); 
            socket.emit('connected');
        })
        

        // New message received
        socket.on('new message', (newMsgReceived)=>{
            var chat = newMsgReceived.chat;
            
            if(!chat.users) return console.log("❌ Chat.users not defined");
            // console.log(newMsgReceived)
            
            chat.users.forEach((user)=>{  
                // console.log("we");  
                if(user._id == newMsgReceived.sender._id) return;

                socket.in(user._id).emit('message received', newMsgReceived);
            })
        })

        
        
        // Join a group/chat room
        socket.on('join chat', (room)=>{
            socket.join(room);
            console.log("👥 User joined chat room:", room);
        })

        
        // Typing events
        socket.on('typing', ({room, user})=>{
            socket.to(room).emit("typing", {chatRoom:room, sender: user});
        })

        socket.on('stop typing', ({room, user})=>{
            socket.to(room).emit("stop typing", {chatRoom:room, sender: user});
        })


        // disconnect
        socket.off('setup', (userData)=>{
            console.log("Disconnected");
            socket.leave(userData._id);
        })

    })
    

})
.catch((err) => console.log("⚠️ MongoDB connection failed"));



