import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../Context/ChatProvider';
import SideDrawer from '../components/core/SideDrawer';
import MyChats from '../components/core/MyChats';
import ChatBox from '../components/core/ChatBox';




const Chats = () => {
    const {user} = ChatState();
    // console.log("user: ", user);
  
    return (
    <div className='w-full h-screen'>
        
        {user && <SideDrawer/>}

        <div className='flex justify-between items-center'>
            {user && <MyChats/>}
            {user && <ChatBox/>}
        </div>




    </div>
  )
}

export default Chats