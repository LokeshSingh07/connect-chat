import React, { useState } from 'react'
import { IoMdSearch } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { ChatState } from '../../Context/ChatProvider';
import { Link, useNavigate } from 'react-router-dom';
import "../common/common.css"


const SideDrawer = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();
    const [dropdown, setDropdown] = useState(false);
    const {user} = ChatState(); 



    const handleSearch = ()=>{
        
    }

    
    const logout = ()=>{
        localStorage.removeItem('accessToken')
        navigate('/');
        toast.success("logged out")
    }



  return (
    <>
        <div className='flex justify-between items-center h-10 bg-slate-200 px-5'>
            {/* <Tooltip label="search Users to chat"/> */}
            <div className='flex justify-center items-center gap-2'>
                <IoMdSearch/>
                <input 
                    type='text' 
                    placeholder='Search user'
                    value={search} 
                    onChange={handleSearch}
                    className='w-[120px] rounded-md py-1 px-2'
                />
            </div>


            <div>
                <h1 className='text-[18px] font-semibold'>Connect</h1>
            </div>

            <div className='flex justify-center items-center gap-x-4'>
                <FaBell fontSize={24}/>

                {/* Profile */}
                <div className='relative'>
                    <div 
                        className='flex justify-center items-center gap-2 hover:bg-slate-50 p-2 rounded-md'
                        onClick={()=>setDropdown(!dropdown)}
                    >
                        <CgProfile fontSize={24}/>
                        <FaChevronDown fontSize={10}/>
                    </div>

                    {/* dropdown menu */}
                    {
                        dropdown && (
                            <div onClick={(e)=> e.stopPropagation()}
                                className='absolute top-10 right-0 z-[1000] bg-slate-200 p-2 rounded-sm'
                            >
                                <Link to="">
                                    <div className='py-2'>
                                        My Profile
                                    </div>
                                </Link>

                                <div onClick={()=> {
                                        setDropdown(false)
                                        logout()
                                    }}
                                    className='bg-red-400 px-4 py-2 rounded-md'
                                >
                                    Logout
                                </div>
                            </div>
                        )
                    }
                </div>


            </div>




        </div>

        
    </>
  )
}

export default SideDrawer