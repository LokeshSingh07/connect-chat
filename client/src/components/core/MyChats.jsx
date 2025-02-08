import React, { useEffect, useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import axios from 'axios';
import toast from 'react-hot-toast';
import AddLogo from "../../assets/add.svg";
import ChatList from './Chats/ChatList';


const MyChats = () => {
  const  accessToken  = localStorage.getItem("accessToken");
  const [ loggedUser, setLoggesUser] = useState();
  const { selectedChat, setSelectedChat, chats, setChats } = ChatState();


  const fetchChats = async()=>{
    try{
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }
      
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/chat`, config);
      setChats(response.data.data);

      console.log("fetch chat : ", response.data.data);
    }
    catch(err){
      toast("Error fetching the chat");
    }
    finally{
    }
  }

  useEffect(()=>{
    setLoggesUser(JSON.parse(localStorage.getItem("user")))
    fetchChats();
    console.log(chats)
  },[]);


  return (
    <div className={`${!selectedChat ? "" : "hidden md:flex"} flex-col w-full md:w-[45%] lg:w-[35%] h-[calc(100vh-52px)] bg-[#F0F2F5] py-2 px-1 mt-1 mx-1 border-[1px] border-[#B5B6B6] rounded-sm`}>
      
      <div className='flex justify-between items-center pl-2'>
        <div className='text-2xl font-medium'>Chats</div>
        <div className=''>
          <img src={AddLogo} alt='icon' className='w-7 cursor-pointer transition-all duration-100'/>
        </div>
      </div>

      {/* search filter */}
      <div className='my-2'>
        <input 
          type='text'
          placeholder='Search or start a new chat'
          className='w-full py-2 px-4 text-md text-gray-400 border border-blue-100 bg-[#f2f9ff] rounded-lg'
          required  
        />
      </div>


      {/* chats */}
      { 
        chats && (
          chats?.map((chat)=>(
            <ChatList
              key={chat._id}
              chat={chat}
            />
          ))
        )


      }


    </div>
  )
}

export default MyChats