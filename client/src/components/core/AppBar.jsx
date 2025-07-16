import React, { useState } from 'react'
import { IoMdSearch } from "react-icons/io";
import { GoBell } from "react-icons/go";
import { FaChevronDown } from "react-icons/fa";
import { ChatState } from '../../Context/ChatProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import "../common/common.css"
import ProfileModal from '../common/ProfileModal';
import SidebarDrawer from '../common/SidebarDrawer';
import Logo from "../../assets/logo.png"
import { MessageCircle, Sparkles } from 'lucide-react';
import { getSender } from '../../utils/chatLogic';




const AppBar = () => {
    const { user, resetChatContext, notification, setNotification } = ChatState(); 
    const [ isOpen, setIsOpen ] = useState(false);
    const [ isSideBarOpen, setIsSideBarOpen ] = useState(false);
    const [ dropdown, setDropdown ] = useState(false);
    // const [ notificationDropdown, setNotificationDropdown] = useState(false);
    const navigate = useNavigate();
    
    const location = useLocation();
    const isHome = location.pathname === '/home';
  


    
    const logout = ()=>{
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user')

        resetChatContext(); // ✅ centralized reset
        navigate('/');
        toast.success("logged out")
        console.log("Logout onClick");
    }



  return (
    <>
        { !isHome && 

        <div className='flex justify-between items-center h-12 bg-[#f2f9ff] px-5'>
            {/* <div className='flexbox gap-2 select-none'>
                <img src={Logo}
                    alt='logo'
                    loading='lazy'
                    width={25}
                />
                <span className="ml-2 text-xl font-bold text-gray-800 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                        Connect
                </span>
            </div> */}
            
            {/* Logo Section */}
            <Link to={'/home'} className="flex items-center animate-slide-in-left">
                <div className="relative">
                    <MessageCircle className="h-8 w-8 text-green-500 animate-pulse" />
                    <Sparkles className="h-4 w-4 text-green-500 absolute -top-1 -right-1 animate-bounce" />
                </div>
                <span className="ml-2 text-xl font-bold text-gray-800 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                    Connect
                </span>
            </Link>


            {/* <Tooltip label="search Users to chat"/> */}
            <div className='relative flex justify-center items-center gap-2 group bg-slate-50 shadow-lg rounded-full px-5 py-1'
                onClick={()=> {
                    setIsSideBarOpen(true)
                    setDropdown(false)
                }}
            >
                <IoMdSearch/>
                <div className='hidden md:block w-[150px] rounded-md py-1 px-2'>search users</div>
                <div className='absolute top-10 bg-gray-100 rounded-full px-4 py-1 text-sm min-w-[180px] invisible group-hover:visible transition-all duration-150'>
                    Click to search user
                </div>
            </div>
            
            <div className='flex justify-center items-center gap-x-2'>
                {/* 
                <div className='relative'>
                    <div onClick={()=>setNotificationDropdown(prev => !prev)}>
                        <GoBell className='hidden md:block text-[24px] hover:text-[25px] cursor-pointer transition-all duration-200'/>
                         {notification.length > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-[4px] flex items-center justify-center rounded-full">
                            {notification.length > 9  ? "9+" : notification.length}
                            </span>
                        )}
                    </div>
                    {
                        notificationDropdown && (<div onClick={(e)=> e.stopPropagation()}
                            className='w-[250px] text-center absolute grid-cols-1 space-y-2 top-10 right-0 z-[1000] bg-[#f2f9ff] py-2 px-1 rounded-md'
                        >
                            {
                                notification.length == 0 ? "No new messages" : 
                                (<div>
                                    {
                                        notification.map((noti)=> (
                                            <div key={noti._id} className='bg-slate-200 rounded-md'>
                                                {
                                                    noti?.chat?.isGroupChat ? `New message in ${noti?.chat?.chatName}` : `New message from ${getSender(noti?.chat, user._id)}`
                                                }
                                            </div>
                                        ))
                                    }
                                </div>)
                            }
                        </div>)
                    }

                </div>
                */}
                
                
                {/* Profile */}
                <div className='relative'>
                    <div 
                        className='flex justify-center items-center gap-2 w-fit h-fit rounded-md bg-slate-100 hover:bg-[#e4f2fe] p-2 cursor-pointer'
                        onClick={()=>setDropdown(!dropdown)}
                    >
                        <img src={`https://ui-avatars.com/api/?name=${user?.name}`} className='w-[30px] h-[30px] bg-slate-300 object-cover rounded-full'/>
                        <FaChevronDown fontSize={10} className={`hidden md:block transition-transform delay-100 ${dropdown && "rotate-180"}`}/>
                    </div>

                    {/* dropdown menu */}
                    {
                        dropdown && (
                            <div onClick={(e)=> e.stopPropagation()}
                                className='w-[150px] text-center absolute grid-cols-1 space-y-2 top-10 right-0 z-[1000] bg-[#f2f9ff] p-1 rounded-md'
                            >
                                {/* <div> */}
                                    <button className='w-full px-4 py-2 rounded-md hover:bg-[#e4f2fe] hover:font-semibold transition-all duration-200'
                                        onClick={()=> {
                                            setIsOpen(true)
                                            setDropdown(false)
                                        }}
                                    >
                                        My Profile
                                    </button>
                                {/* </div> */}

                                <button onClick={()=> {
                                        setDropdown(false)
                                        logout()
                                    }}
                                    className='w-full px-4 py-2 rounded-md hover:bg-[#e4f2fe] text-red-600 hover:text-red-700 hover:font-semibold cursor-pointer transition-all duration-200'
                                >
                                    Logout
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>

        }

        {
            isOpen && 
            <ProfileModal 
                setIsOpen={setIsOpen} 
                userInfo={user}
            />
        }

        {
            isSideBarOpen && 
            <SidebarDrawer 
                setIsSideBarOpen={setIsSideBarOpen}
            />
        }
        


        {/* Home Page specific */}
        {
            isHome && (
                <nav className="border-b border-gray-200 bg-white/90 backdrop-blur-md relative z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                    {/* Logo Section */}
                    <div className="flex items-center animate-slide-in-left">
                        <div className="relative">
                            <MessageCircle className="h-8 w-8 text-green-500 animate-pulse" />
                            <Sparkles className="h-4 w-4 text-green-500 absolute -top-1 -right-1 animate-bounce" />
                        </div>
                        <span className="ml-2 text-xl font-bold text-gray-800 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                            Connect
                        </span>
                    </div>

                    {/* Navigation Links */}
                    {user ?
                        (<div className=''>
                            <Link
                                to={'/chats'}
                                className="px-4 py-2 font-medium rounded-md bg-white border border-green-400 text-green-600 hover:border-green-600 transition duration-200"
                            >
                                Enter Workspace 
                            </Link>
                        </div>)
                        : 
                        (<div className="hidden md:flex items-center space-x-8 ">
                            <Link
                                to={'/'}
                                className="px-4 py-2 bg-white border border-green-400 hover:border-green-600 text-green-600"
                            >
                                Sign In
                            </Link>
                            <Link
                                to={'/signup'}
                                className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:brightness-110 shadow-md  rounded-md"
                            >
                                Get Started
                            </Link>
                        </div>)
                    }
                    </div>
                </div>
                </nav>
            )
        }

    </>
  )
}

export default AppBar