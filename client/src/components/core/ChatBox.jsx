import React, { useEffect, useState, useRef, useMemo } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import { MdMoreVert } from "react-icons/md";
import { IoIosArrowBack, IoMdSend } from 'react-icons/io';
import chatBg from '../../assets/chatBg.jpg'
import ProfileModal from '../common/ProfileModal';
import GroupChatModal from '../miscellaneous/GroupChatModal';
import { CiCircleInfo } from "react-icons/ci";
import { Info, SendHorizontal } from 'lucide-react';
import Loading from '../common/Loading';
import toast from 'react-hot-toast';
import axios from 'axios';
import io from "socket.io-client";
import Lottie from "react-lottie"
import animationData from "../../assets/animation/typing.json"
import { Element, scroller } from 'react-scroll';
import { formatDateLabel } from '../../utils/formatDate';




const ENDPOINT = import.meta.env.VITE_BASE_URL;
export var socket, selectedChatCompare; 
const MESSAGES_PER_PAGE = 50;



const ChatBox = () => {
  const {user, selectedChat, setSelectedChat, notification , setNotification, setChatUpdateTrigger} = ChatState();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("")
  const accessToken  = localStorage.getItem("accessToken");
  const [socketConnected, setSocketConnected] = useState(false);
  
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUserName, setTypingUserName] = useState("");
  
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  // console.log("selected chat in ChatBox: ", selectedChat)




  // =============================== socket ===============================
  useEffect(()=>{
    socket = io(ENDPOINT);
    socket.emit('setup', user);
    socket.on('connected', ()=> setSocketConnected(true))

  },[])


  useEffect(()=>{
    const handleMessage = (newMsgReceived)=>{
      if(!selectedChatCompare || (selectedChatCompare?._id !== newMsgReceived.chat._id)){
        // show notification
        // if(!notification.includes(newMsgReceived)){
          setNotification([newMsgReceived, ...notification]);
          setChatUpdateTrigger(prev=> !prev)
        // }
      }
      else{
        setMessages((prev) => [...prev, newMsgReceived]);
      }
    }

    const handleTyping = ({chatRoom, sender})=>{
      console.log("sc ; ", selectedChat ,  " , room : ", chatRoom)
      if((sender._id != user._id) && chatRoom == selectedChat._id) {
        setIsTyping(true)
        setTypingUserName(sender.name)
      }
      else setIsTyping(false);
    };

    const handleStopTyping = ({chatRoom, sender})=>{
      if((sender._id != user._id) && (selectedChat?._id != chatRoom)) {
        setIsTyping(false)
        setTypingUserName("");
      }
      else setIsTyping(false);
    }

    socket.on('message received', handleMessage)
    socket.on('typing', handleTyping);
    socket.on('stop typing', handleStopTyping);


    return () => {
      socket.off('message received', handleMessage) 
      socket.off('typing', handleTyping);
      socket.off('stop typing', handleStopTyping);
    };
  },[selectedChat]) 


  // ===================================================================================


    
  const getChatUser = () => {
    if (!selectedChat?.users || selectedChat.users.length < 2) return null;
    return selectedChat.users[0]._id === user._id ? selectedChat.users[1] : selectedChat.users[0];
  };

  const chatUser = getChatUser();

  const isSameSender = (messages, m, i, userId)=>{
    return (
      i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      m.sender._id !== userId
    );
  }
    
  const isLastMessage = (messages, i, userId)=>{
    return (
      i === messages.length - 1 &&
      messages[messages.length-1].sender._id !== userId 
    );
  }




  // ================================= FETCH MESSAGES =================================

  const fetchMessages = async(pageNum=1)=>{
    if(!selectedChat || !hasMore) return;

    const config = { headers: { Authorization: `Bearer ${accessToken}` }}
    setLoading(true);

    try{
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/message/${selectedChat._id}?page=${pageNum}&limit=${MESSAGES_PER_PAGE}`, config
      );

      
      const allMsgs = [...data.data.allMsgData].reverse();
      setMessages((prev) => [...allMsgs]);
      
      if(selectedChatCompare?._id !== selectedChat._id) setMessages((prev) => [...allMsgs, ...prev]);
      // console.log("messages : ", data)

      // real time connection
      socket.emit('join chat', selectedChat._id); 
    }
    catch(err){
      toast.error("Internal server Error!");
      console.log(err);
    }
    finally{
      setLoading(false);
    }
  }


  useEffect(()=>{
    fetchMessages();

    selectedChatCompare = selectedChat;
    
  },[selectedChat])






  // ================================= SEND MESSGAGES =================================
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessageHandler(e);
    }
  };


  const sendMessageHandler = async(e)=>{ 
    setLoading(true);
    const config = { headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` }}
    setNewMessage("");

    try{
      const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/message/`,
        {
          chatId: selectedChat._id,
          content: newMessage,
        },
        config
      );

      console.log("response data : ", data);

      // socket
      socket.emit('new message', data.data)
      socket.emit('stop typing', {
        room: selectedChat._id, 
        user: {_id:user._id, name:user.name}}
      )
      setTypingUserName("");


      setMessages([...messages, data.data]);
      // toast(data?.message || "message sent");

    }
    catch(err){
      toast.error("Something is wrong");
      console.log(err);
    }
    finally{
      setLoading(false);
    }
  }
  

  const typingHandler = (e)=>{
    setNewMessage(e.target.value);

    // TODO : Tying indicator
    if(!socketConnected) return;

    if(!typing){
      setTyping(true);
      socket.emit('typing', {
        room: selectedChat._id,
        user: {_id:user._id, name:user.name}}
      )
    }


    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;

    setTimeout(()=>{
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;

      if(timeDiff >= timerLength && typing){
        socket.emit('stop typing', {
          room: selectedChat._id,
          user: {_id:user._id, name:user.name}}
        )
        setTyping(false);
      }
    }, timerLength)
  }


  useEffect(() => {
    scroller.scrollTo('end-of-chat', {
      duration: 300,
      delay: 0,
      smooth: false,
      containerId: 'scroll-container',
    });
  }, [messages]);



  const groupMessagesByDate = (messages)=>{
    const groups = {};

    messages.forEach((msg) => {
      const date = new Date(msg.createdAt).toDateString();

      if(!groups[date]) groups[date] = [];
      groups[date].push(msg);
    });

    return groups;
  }


  const groupedMessages = groupMessagesByDate(messages);




  return (
    <div className={`${!selectedChat ? "hidden md:flex" : ""} flex-col w-full h-[calc(100vh-52px)] bg-[#F0F2F5] mt-1 border-[1px] border-[#B5B6B6] rounded-sm `}>
      {
        selectedChat ?
        (<>         
          <div className='flex justify-between items-center pr-4 py-2 bg-blue-50'>
            {/* name & icon & back button */}
            <div className='text-2xl font-medium flex items-center gap-2'>
              <span onClick={()=> setSelectedChat(null)} className='pl-2 md:hidden cursor-pointer'>
                <IoIosArrowBack/>
              </span>
              <div className="w-12 h-12 md:mx-4 flex justify-center items-center bg-gray-300 rounded-full overflow-hidden">
                <img src={selectedChat?.isGroupChat ? `https://ui-avatars.com/api/?name=${selectedChat?.chatName}` : chatUser?.pic} className='w-full h-full object-cover'/>
              </div>

              <div className=''>
                <div className='text-xl font-semibold capitalize'>
                  {
                    selectedChat?.isGroupChat ?  
                    selectedChat?.chatName : 
                    chatUser?.name || "Unknown"
                  }
                </div>
                <div className='text-xs font-normal'>
                  {
                    isTyping && selectedChat.isGroupChat && `${typingUserName} is typing..`
                  }
                  {
                    isTyping &&  !selectedChat.isGroupChat && `typing...`
                  }
                </div>
              </div>
            </div>

            {/* right side: view profile/group modal */}
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
                      userInfo={getChatUser()}
                  />}
                </div>)
              }
            </div>
          </div>


          {/* ========================================================================================== */}
          {/* ------------------------------------ CONTENT MESSAGES ------------------------------------ */}
          <div className={`flex flex-col h-[calc(100vh-120px)] w-full`}>
            <div
              className="flex-1 overflow-y-auto text-sm"
              id="scroll-container"
              style={{
                // backgroundImage: `url(${chatBg})`,
                // backgroundSize: 'cover',
                // backgroundRepeat: 'no-repeat',
                // backgroundPosition: 'center',
              }}
            >
              {
                loading ? 
                (<div className='w-full h-full flex items-center justify-center'>
                  <Loading size={90}/>
                </div>) :  
                (<div className='w-full h-full flex flex-col gap-4'>
                    
                  {/* Messages */}
                  {
                    Object?.entries(groupedMessages).map(([date, msgs])=> (
                      <div>
                        <div className="flex justify-center mt-4">
                           <span className="bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1 rounded-md shadow-sm">
                              {formatDateLabel(date)}
                            </span>
                        </div>

                        {
                          msgs.map((msg, index)=> (
                            <div key={msg._id} 
                              className={`w-full flex items-end ${msg.sender._id !== user._id ? "justify-start" : "justify-end" } px-2 lg:px-8 py-1`}
                            >
                              <div className='hidden sm:block'>
                                {
                                  (isSameSender(messages, msg, index, user._id) || isLastMessage(messages, index, user._id)) ? <img src={msg.sender.pic} className='w-8 h-8 mr-2 bg-slate-200 rounded-full'/> : 
                                  <div className='w-10'></div>
                                }
                              </div>
                              <div 
                                className={`w-fit relative max-w-[60%] lg:max-w-[40%] flex flex-col items-center ${msg.sender._id !== user._id ? "text-black bg-green-200" : "text-black bg-blue-200" } pl-4 pr-2 py-2 rounded-t-2xl rounded-l-md`}
                              > 
                                <span className='pr-12 break-all'>{msg.content}</span>
                                <div className='absolute right-0 bottom-0 text-[10px] text-gray-500 pr-1'>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    ))
                  }
                  
                  <Element name="end-of-chat" />


                </div>)
              }

            </div>

            {isTyping ? <div className='w-fit flex justify-center items-center gap-2 px-4'>
              <Lottie
                options={defaultOptions}
                width={50}
                style={{marginLeft: 20}}
              />
            </div> : ""}

            {/* Input */}
            <div className="w-full flex items-center justify-center gap-2 px-4 py-2">
              {/* <div className="w-full "> */}
              <input 
                type="text"
                placeholder="Enter a message"
                className="w-full py-3 text-md font-medium text-gray-900 px-5 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150"
                onChange={(e) => typingHandler(e)}
                value={newMessage}
                onKeyDown={handleKeyDown}
                required  
              />
              {/* </div> */}
              
              
              <button 
                onClick={sendMessageHandler}
                className="w-10 h-10 bg-blue-400 rounded-full hover:cursor-pointer hover:bg-blue-500 transition-all delay-100"
              >
                <SendHorizontal className="text-white relative left-[8px] " />
              </button>
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