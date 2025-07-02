import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import { MdMoreVert } from "react-icons/md";
import { IoIosArrowBack, IoMdSend } from 'react-icons/io';
import chatBg from '../../assets/chatBg.jpg'
import ProfileModal from '../common/ProfileModal';
import GroupChatModal from '../miscellaneous/GroupChatModal';
import { CiCircleInfo } from "react-icons/ci";
import { Info } from 'lucide-react';





const ChatBox = () => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [ isOpen, setIsOpen ] = useState(false);

  console.log("selected chat: ", selectedChat)
    
  
  const getChatUser = () => {
    if (!selectedChat?.users || selectedChat.users.length < 2) return null;
    return selectedChat.users[0]._id === user._id ? selectedChat.users[1] : selectedChat.users[0];
  };

  const chatUser = getChatUser();



  return (
    <div className={`${!selectedChat ? "hidden md:flex" : ""} flex-col w-full h-[calc(100vh-52px)] bg-[#F0F2F5] mt-1 border-[1px] border-[#B5B6B6] rounded-sm `}>
      {
        selectedChat ?
        (<>         
          <div className='flex justify-between items-center px-5 py-2 bg-blue-50'>
            <div className='text-2xl font-medium flex items-center gap-2'>
              <span onClick={()=> setSelectedChat(null)} className=' md:hidden cursor-pointer'>
                <IoIosArrowBack/>
              </span>
              <div className="w-12 h-12 flex justify-center items-center bg-gray-300 rounded-full overflow-hidden">
                <img src={selectedChat?.isGroupChat ? `https://avatar.iran.liara.run/username?username=${selectedChat?.chatName}` : chatUser?.pic} className='w-full h-full object-cover'/>
              </div>

              <span className='text-xl font-semibold capitalize'>
                {
                  selectedChat?.isGroupChat ?  
                  selectedChat?.chatName : 
                  chatUser?.name || "Unknown"
                }
              </span>
            </div>
            <div className='cursor-pointer'>
              <Info 
                onClick={()=>
                  // setSelectedChat("")
                  setIsOpen(true)
                }
                fontSize={22}
              />
              {
                selectedChat.isGroupChat ? 
                (<div>
                  {isOpen && 
                    <GroupChatModal
                      setIsOpen={setIsOpen}
                      selectedChat={selectedChat}
                      // isCreatingGroupChat={false}
                    />
                  }
                </div>) : 
                (<div> 
                  {isOpen && 
                  <ProfileModal 
                      setIsOpen={setIsOpen} 
                      userInfo={selectedChat.users[0]._id == user._id ? selectedChat.users[1] : selectedChat.users[0] }
                  />}
                </div>)
              }
            </div>
          </div>

          {/* content */}
          <div className={`flex flex-col h-[calc(100vh-120px)] w-full`}>
            {/* Messages */}
            <div
              className="flex-1 overflow-y-scroll px-12 py-2 text-sm"
              style={{
                // backgroundImage: `url(${chatBg})`,
                // backgroundSize: 'cover',
                // backgroundRepeat: 'no-repeat',
                // backgroundPosition: 'center',
              }}
            >
              {/* Repeat for testing scroll */}
              {[...Array(30)].map((_, idx) => (
                <div
                  key={idx}
                  className={`w-full flex ${idx % 2 === 0 ? 'justify-start' : 'justify-end'} my-1`}
                >
                  <div className={`max-w-[60%] px-2 py-1 rounded-lg text-black ${idx % 2 === 0 ? 'bg-blue-400' : 'bg-yellow-400'}`}>
                     {/* User image */}
                    <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-300 flex-shrink-0">
                      <img 
                        src={chatUser?.pic} 
                        alt="User" 
                        className="w-full h-full object-cover" 
                      />
                    </div>

                    {/* Message bubble */}
                    <div className={`px-3 py-2 rounded-lg text-black `}>
                      <div>
                        Sample message {idx + 1}. Study Notion is a fully functional EdTech platform that enables users to create, consume and rate educational content.
                      </div>
                      <div className="text-[10px] text-gray-700 mt-1 text-right">
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            </div>


            {/* Input */}
            <div className="flex items-center px-4 py-2">
              <div className="flex items-center flex-1 border border-blue-100 rounded-full pl-8 pr-2 bg-[#f2f9ff] focus-within:bg-transparent transition-colors duration-200">
                <input 
                  type="text"
                  placeholder="Enter a message"
                  className="flex-1 py-2 text-md font-medium text-gray-900 bg-transparent focus:outline-none"
                  required  
                />
                <div className="w-8 h-8 flex justify-center items-center bg-blue-400 rounded-full hover:cursor-pointer hover:bg-blue-500 transition-all delay-100">
                  <IoMdSend fontSize={20} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </>) : 
        (
          <div className='w-[70%] h-full mx-auto flex flex-col justify-center items-center'>
            <div className='text-lg font-semibold'>Connect for Windows</div>
            <p className='text-sm'>Send and receive messages easily.</p>
            <p className='text-sm'>Enjoy a seamless chat experience directly from your web browser.</p>
          </div>
        )


      }

    </div>
  )
}

export default ChatBox