import React, { useEffect, useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import axios from 'axios';
import toast from 'react-hot-toast';
import AddLogo from "../../assets/add.svg";
import ChatList from './Chats/ChatList';
import GroupChatModal from '../miscellaneous/GroupChatModal';
import { FiSearch } from 'react-icons/fi';



const MyChats = () => {
  const  accessToken  = localStorage.getItem("accessToken");
  // const [ loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, chats, setChats, user, chatUpdateTrigger } = ChatState();
  const [isOpen, setIsOpen] = useState(false);



  const fetchChats = async()=>{
    try{
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }
      
      const response = await axios.get(`http://localhost:4000/api/v1/chat`, config);
      setChats(response.data.data);

      // console.log("fetch chat : ", response?.data?.data);
    }
    catch(err){
      toast("Error fetching the chat");
    }
    finally{
    }
  }

  useEffect(()=>{
    // setLoggedUser(JSON.parse(localStorage.getItem("user")))
    fetchChats();
  },[chatUpdateTrigger]);


  return (
    <div className={`${!selectedChat ? "" : "hidden md:flex"} relative flex-col w-full md:w-[45%] lg:w-[40%] h-[calc(100vh-52px)] bg-[#F0F2F5] py-2 pl-1 mt-1 mx-[1px] border-[1px] border-[#B5B6B6] rounded-sm`}>
      
      <div className='absolute top-3 w-[98%] mx-auto bg-[#F0F2F5]'>
        <div className='flex justify-between items-center pl-2 select-none'>
          <div className='text-2xl font-medium'>Chats</div>
          <div className=''>
            <button onClick={()=> setIsOpen(true)}>
              <img src={AddLogo} alt='icon' className='w-7 transition-all duration-100'/>
            </button>
          </div>
        </div>

        {/* search filter */}
        <div className='mt-2 relative'>
          <input 
            type='text'
            placeholder='Search or start a new chat'
            className='w-full py-2 px-10 text-sm font-normal text-gray-700 border border-gray-300 bg-[#f2f9ff] shadow-sm rounded-lg'
            required  
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-base" />
        </div>
      </div>
      

      {/* chats */}
      <div className='mt-[95px] overflow-y-scroll h-[calc(100%-95px)]'>
        { 
          chats && (
            chats?.map((chat)=>(
              <ChatList
                key={chat._id}
                chat={chat}
                // loggedUser={loggedUser}
              />
            ))
          )
        }


        {
          isOpen && (
            <GroupChatModal
              setIsOpen={setIsOpen}
              isCreatingGroupChat={true}
            />
          )
        }
      </div>


    </div>
  )
}

export default MyChats