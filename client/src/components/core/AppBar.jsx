import React, { useState } from 'react'
import { IoMdSearch } from "react-icons/io";
import { GoBell } from "react-icons/go";
import { FaChevronDown } from "react-icons/fa";
import { ChatState } from '../../Context/ChatProvider';
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import "../common/common.css"
import ProfileModal from '../common/ProfileModal';
import SidebarDrawer from '../common/SidebarDrawer';
import Logo from "../../assets/logo.png"





const AppBar = () => {
    const { user } = ChatState(); 
    const [ isOpen, setIsOpen ] = useState(false);
    const [ isSideBarOpen, setIsSideBarOpen ] = useState(false);
    const [ dropdown, setDropdown ] = useState(false);
    const navigate = useNavigate();




    
    const logout = ()=>{
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user')
        navigate('/');
        toast.success("logged out")
        console.log("Logout onClick");
    }



  return (
    <>
        <div className='flex justify-between items-center h-12 bg-[#f2f9ff] px-5'>
            <div className='flexbox gap-2 select-none'>
                <img src={Logo}
                    alt='logo'
                    loading='lazy'
                    width={25}
                />
                <h2 className='text-[16px] font-medium'>Connect</h2>
            </div>

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
                <GoBell className='hidden md:block text-[24px] hover:text-[25px] cursor-pointer transition-all duration-200'/>

                {/* Profile */}
                <div className='relative'>
                    <div 
                        className='flex justify-center items-center gap-2 hover:bg-[#e4f2fe] p-2 rounded-md cursor-pointer'
                        onClick={()=>setDropdown(!dropdown)}
                    >
                        <img src={`https://avatar.iran.liara.run/username?username=${user?.name}`} className='w-[30px] object-cover rounded-full'/>
                        <FaChevronDown fontSize={10} className={`hidden md:block transition-transform delay-100 ${dropdown && "rotate-180"}`}/>
                    </div>

                    {/* dropdown menu */}
                    {
                        dropdown && (
                            <div onClick={(e)=> e.stopPropagation()}
                                className='w-[150px] text-center absolute grid-cols-1 space-y-2 top-10 right-0 z-[1000] bg-[#f2f9ff] p-1 rounded-md'
                            >
                                <Link to="">
                                    <div className='px-4 py-2 rounded-md hover:bg-[#e4f2fe] hover:font-semibold transition-all duration-200'
                                        onClick={()=> {
                                            setIsOpen(true)
                                            setDropdown(false)
                                        }}
                                    >
                                        My Profile
                                    </div>
                                </Link>

                                <div onClick={()=> {
                                        setDropdown(false)
                                        logout()
                                    }}
                                    className='px-4 py-2 rounded-md hover:bg-[#e4f2fe] text-red-600 hover:text-red-700 hover:font-semibold cursor-pointer transition-all duration-200'
                                >
                                    Logout
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>

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
        
    </>
  )
}

export default AppBar