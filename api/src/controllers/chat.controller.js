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




const createGroupChat = asyncHandler(async(req,res)=> {
    const { chatName, users } = req.body;

    if (!chatName || !users) {
        throw new ApiError(403, "All fields are required");
    }

    // we can't send array directly, we need to send it in the stringyfy format
    const usersIds = JSON.parse(users);
    if(usersIds.length < 2){
        throw new ApiError(403, "Minimum 2 users are required to create a group chat");
    }

    usersIds.push(req.user._id);

    const chatData = await Chat.create({
        chatName,
        isGroupChat: true,
        users: usersIds,
        groupAdmin: req.user._id
    });

    const ChatDetails = await Chat.findOne(chatData._id)
    .populate("users", "name email pic")
    .populate({
        path: "latestMessage",
    }).exec();


    return res.status(200)
    .json(
        new ApiResponse(200, ChatDetails, "Group created successfully")
    )
})



const renameGroup = asyncHandler(async(req,res)=> {
    const { chatId, chatName } = req.body;

    if(!chatId || !chatName){
        throw new ApiError(403, "All fields are required");
    }

    const chatData = await Chat.findByIdAndUpdate(
        {_id: chatId},
        {
            $set: {chatName: chatName}
        },
        {new: true}
    )
    .populate("users", "name email pic")
    .populate("latestMessage")
    .exec();

    return res
    .status(200)
    .json(
        new ApiResponse(200, chatData, "Group renamed successfully")
    )
})




const addToGroup = asyncHandler(async(req,res)=>{
    const { chatId, userId } = req.body;

    if(!chatId || !userId){
        throw new ApiError(403, "All fields are required");
    }

    const chatData = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: {
                users: userId
            }
        },
        {new: true}
    )
    .populate("users", "name email pic")
    .populate("latestMessage")
    .exec();

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            chatData,
            "User added to group successfully"
        )
    )

})




const removeFromGroup = asyncHandler(async(req,res)=> {
    const { chatId, userId } = req.body;
    
    if(!chatId || !userId){
        throw new ApiError(403, "All fields are required");
    }

    const chatData = await Chat.findByIdAndUpdate(
        {_id: chatId},
        {
            $pull: {
                users: userId
            }
        },
        {new: true}
    )
    .populate("users", "name email pic")
    .populate("latestMessage")
    .exec();


    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            chatData,
            "User remove to group successfully"
        )
    )

})





export {
    accessChat,
    fetchChats,
    createGroupChat,
    renameGroup,
    addToGroup,
    removeFromGroup
};