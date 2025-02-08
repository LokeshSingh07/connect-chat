import React from 'react'
import { ChatState } from '../../../Context/ChatProvider';

function ChatList({chat}) {
  
    const { setSelectedChat } = ChatState();



  return (
    <div className="flex items-center gap-4 px-4 py-2 border rounded-lg shadow-md w-full hover:bg-blue-500 hover:text-white transition-all delay-100 cursor-pointer"
      onClick={()=>setSelectedChat(chat._id)}
    >
        <div className="w-12 h-12 bg-gray-300 rounded-full">
            <img src={chat?.users[0].pic} className='w-full h-full rounded-full'/>
        </div>
        <div className="flex-1">
            <div className="rounded w-full text-sm capitalize">{chat?.chatName}</div>
            <div className="rounded w-1/2 text-xs">{chat?.latestMessage?.content}</div>
        </div>
    </div>
  )
}

export default ChatList