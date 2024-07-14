// sendMessage
// allMesssage


import { Message } from "../models/message.models.js";
import { Chat } from "../models/chat.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";




const sendMessage = asyncHandler(async(req,res)=>{
    const {chatId, content} = req.body;

    if(!chatId || !content){
        throw new ApiError(403,"chatId and content are required");
    }

    const messageData = await Message.create({
        sender: req.user._id,
        content,
        chat: chatId
    })

    // update the latest message of chat
    const latestMessageUpdate = await Chat.findByIdAndUpdate(
        chatId,
        {
            $set: {latestMessage: messageData._id},
        },
        {new: true}
    )

    const messageDetails = await Message.findById(messageData._id)
    .populate("sender", "name email pic")
    .populate({
        path: "chat",
        populate: {
            path: "users latestMessage",
        },
    })


    return res.status(200)
    .json(
        new ApiResponse(200, messageDetails, "message send succcessfully")
    )
})




const allMessage = asyncHandler(async(req,res)=>{
    const {chatId} = req.params;

    if(!chatId){
        throw new ApiError(403, "chatId is required")
    }

    const allMsgData = await Message.find({chat: chatId})
    .populate("sender", "name email pic")
    // .populate("chat")
    .exec();

    return res.status(200).json(
        new ApiResponse(
            200, 
            {
                length: allMsgData.length,
                allMsgData
            }, 
            "All messages fetched successfully"
        )
    )
})




export {
    sendMessage,
    allMessage
}