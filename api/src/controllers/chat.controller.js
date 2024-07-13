// accessChat
// fetchChats
// createdGroupChat
// renameGroup
// addToGroup
// removeFromGroup


import { asyncHandler } from "../utils/asyncHandler.js";
import { Chat } from "../models/chat.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"




// creating and fetching chat b/w two user
const accessChat = asyncHandler(async(req,res)=> {
    const { userId } = req.body;

    if(!userId){
        console.log("UserId not sent with request");
        throw new ApiError(400, "UserId not sent with request");
    }

    const isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            {users: userId},
            {users: req.user._id}
        ]
    })
        .populate("users", "-password")
        .populate({
            path: "latestMessage",
            populate: {
                path: "sender",
                select: "name email pic",
            },
        })
        .exec();


    if(isChat.length > 0){
        return res.status(200).json(
            new ApiResponse(200, isChat, "successfully fetched one to one chat")
        );
    }
    

    const chatData = await Chat.create({
        chatName: "sender",
        isGroupChat: false,
        users: [userId, req.user._id]
    })

    const chatDetails = await Chat.findOne({_id: chatData._id})
    .populate({
        path: "users",
        select: "name email pic",
    })


    return res
    .status(200)
    .json(
        new ApiResponse(
            200, 
            chatDetails, 
            "successfully created one to one chat"
        )
    )
})




const fetchChats = asyncHandler(async(req,res)=> {
    const allChats = await Chat.find({
        users: { $in: [req.user._id] }
    })
    .populate("users", "name email pic")
    .populate("latestMessage")
    .sort({updatedAt: 1})
    .exec();

    return res.status(200)
    .json(
        new ApiResponse(
            200,
            allChats,
            "successfully fetched all chats"
        )
    )
})











export {
    accessChat,
    fetchChats

};