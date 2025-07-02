import { ChatState } from '../Context/ChatProvider';
import MyChats from '../components/core/MyChats';
import ChatBox from '../components/core/ChatBox';
import AppBar from '../components/core/AppBar';




const Chats = () => {
    const {user} = ChatState();
    
  
    return (
    <div className='w-full h-screen flex flex-col'>
        
        {user && <AppBar/>}

        <div className='flex justify-between items-center'>
            {user && <MyChats/>}
            {user && <ChatBox/>}
        </div>




    </div>
  )
}

export default Chats