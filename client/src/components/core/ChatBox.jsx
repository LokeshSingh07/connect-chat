import React from 'react'
import { ChatState } from '../../Context/ChatProvider';
import { MdMoreVert } from "react-icons/md";
import { IoIosArrowBack, IoMdSend } from 'react-icons/io';
import chatBg from '../../assets/chatBg.jpg'





const ChatBox = () => {
  const { selectedChat, setSelectedChat } = ChatState();



  

  return (
    <div className={`${!selectedChat ? "hidden md:flex" : ""} flex-col w-full h-[calc(100vh-52px)] bg-[#F0F2F5] mt-1 border-[1px] border-[#B5B6B6] rounded-sm `}>
      {
        selectedChat ?
        (<>         
          <div className='flex justify-between items-center p-2 bg-blue-50'>
            <div className='text-2xl font-medium flex items-center gap-2'>
              <span onClick={()=> setSelectedChat(null)} className=' md:hidden cursor-pointer'>
                <IoIosArrowBack/>
              </span>
              <img src='' alt='profile image' className='w-10 h-10 object-cover rounded-full bg-black'/>
              <span className='text-xl font-semibold'>NEXT</span>
            </div>
            <div className='cursor-pointer'>
              <MdMoreVert fontSize={22}/>
            </div>
          </div>

          {/* content */}
          <div className={`h-[calc(100vh-109px)] w-full flex flex-col justify-end py-2 px-1`}
            style={{
              backgroundImage: `url(${chatBg})`,
              // opacity: 0.4,
              backgroundPosition: 'cover',
              // backgroundRepeat: 'no-repeat',
              // backgroundSize: '100%'
            }}
          >

            <div className='w-fit px-2 py-1 rounded-lg text-black bg-blue-400'>Hello jii,kya haal chal</div>
            <div className='w-fit px-2 py-1 rounded-lg text-end text-black bg-yellow-400'>This app is in development phase</div>
            <div className='w-fit px-2 py-1 rounded-lg text-black bg-blue-400'>defes</div>







            {/* send message */}
            <div className='flex items-center gap-2 my-1'>
              <input 
                type='text'
                placeholder='Enter a message'
                className='flex-1 py-2 px-4 text-md font-medium text-gray-900 border border-blue-100 bg-[#f2f9ff] rounded-lg'
                required  
              />
              <div className='w-8 h-8 flex justify-center items-center bg-blue-400 rounded-full hover:cursor-pointer hover:bg-blue-500 transition-all delay-100'>
                <IoMdSend fontSize={22} className='ml-1'/>
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