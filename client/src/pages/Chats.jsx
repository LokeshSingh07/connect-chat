import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../Context/ChatProvider';
import MyChats from '../components/core/MyChats';
import ChatBox from '../components/core/ChatBox';
import AppBar from '../components/core/AppBar';




const Chats = () => {
    const {user} = ChatState();
    // console.log("user: ", user);
  
    return (
    <div className='w-full h-screen'>
        
        {user && <AppBar/>}

        <div className='flex justify-between items-center'>
            {user && <MyChats/>}
            {user && <ChatBox/>}
        </div>




    </div>
  )
}

export default Chats