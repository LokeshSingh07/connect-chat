import React from 'react'
import { ChatState } from '../../../Context/ChatProvider';

function ChatList({chat}) {  
  const { setSelectedChat, selectedChat, user } = ChatState();
  

  if (!chat || !chat.users) {
    return null; // Prevent errors if chat is undefined
  }

  
  const getSender = ()=>{
    return chat?.users[0]?._id == user?._id ? chat?.users[1]?.name : chat?.users[0]?.name
  }

  const getImage=  ()=>{
      return chat.isGroupChat
        ? `https://avatar.iran.liara.run/username?username=${chat.chatName}` : 
        chat?.users[0]?._id === user?._id ? chat?.users[1]?.pic : chat?.users[0]?.pic
  }

  return (
    <div className={`${selectedChat?._id == chat?._id ? "bg-blue-700 text-gray-100 hover:bg-blue-600": "hover:bg-blue-500 hover:text-white "} w-full flex items-center gap-2 px-2 py-2 my-1 border-[1px] border-gray-300 rounded-lg shadow-sm cursor-pointer select-none group`}
      onClick={()=>setSelectedChat(chat)}
    >
        <div className="w-12 h-12 flex justify-center items-center bg-gray-300 rounded-full overflow-hidden">
            <img src={getImage()} className='w-full h-full object-cover'/>
        </div>
        <div className="flex-1">
            <div className="w-full flex justify-between items-center text-sm font-medium capitalize">
              {
                !chat?.isGroupChat ? 
                getSender() : 
                chat?.chatName || "Unknown"
              }
              <span className={`text-[10px]`}>
                {chat?.updatedAt ? new Date(chat.updatedAt).toLocaleDateString('en-US', { year: "2-digit", month: "2-digit", day:'2-digit' }) : "No Date"}
              </span>
            </div>
            <div className={`${selectedChat?._id == chat?._id ? "text-gray-100" : "text-gray-600"} text-xs group-hover:text-gray-100 font-normal flex whitespace-nowrap text-ellipsis`}>Latest:<span className='ml-1'>{chat?.latestMessage?.content || " No messages yet"}</span></div>
        </div>
    </div>
  )
}

export default ChatList