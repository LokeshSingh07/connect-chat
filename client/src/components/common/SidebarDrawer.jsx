import React, { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import axios from 'axios';
import ChatLoading from "../miscellaneous/ChatLoading";
import UserListItem from "./UserListItem";
import { ChatState } from "../../Context/ChatProvider";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { FiSearch } from "react-icons/fi";


const SidebarDrawer = ({ setIsSideBarOpen }) => {
  const sidebarRef = useRef(null);
  const  accessToken  = localStorage.getItem("accessToken");
  
  const [ search, setSearch ] = useState("");
  const [ searchResults, setSearchResults ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ loadingChat, setLoadingChat ] = useState(false);
  const { selectedChat, setSelectedChat, chats, setChats, user } = ChatState();



  const handleSearch = async()=>{
    if(!search){
        toast.error("Please Enter something in search", {
            position: "top-left"
        })
        return;
    }

    try{
        setLoading(true);
        const response = await axios.get(`/api/v1/user/getAllUser?search=${search}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        
        console.log("users : ", response.data.data.users);
        setSearchResults(response.data.data.users);
    
    }
    catch(err){
        toast.error("Something is wrong");
        console.log(err);
    }
    finally{
        setLoading(false);
    }
  }


  // create and fetch one-to-one chat
  const accessChat = async(userId)=>{
    try{
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        }
      }
      
      const { data } = await axios.post(`/api/v1/chat`, {userId}, config);
      
      // catch
      if(!chats.find((c)=> c._id === data._id)){
        setChats([data, ...chats] || []);
      }
      setSelectedChat(data);
      // console.log("access chat : ", selectedChat);
    }
    catch(err){
      toast.error("Error fetching the chat, please try again.");
    }
    finally{
      setLoadingChat(false);
    }
  }



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSideBarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsSideBarOpen]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex transition-all delay-2000 z-[1000]">
      <div className="relative w-90 bg-white h-full shadow-xl p-6" ref={sidebarRef}>
        <h2 className="text-xl font-semibold mb-4">Search Users</h2>
        <button onClick={()=> setIsSideBarOpen(false)} className="absolute right-5 top-5 hover:bg-slate-200 rounded-md transition-all duration-30"><IoClose fontSize={24}/></button>
        
        <div className="flex gap-2 mb-4 relative w-full">
           {/* Icon inside input */}
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base z-10 pointer-events-none" />
  
          <input 
            type="text" 
            placeholder="Search by name or email"
            onChange={(e)=> setSearch(e.target.value)}
            className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded-lg text-sm relative z-0"
            required
          />
          <button onClick={() => {
              handleSearch()
            }} 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shrink-0">Go</button>
        </div>
        

        {
          loading ? 
          <ChatLoading/> :
          (
            searchResults?.map((user)=>(
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={()=> accessChat(user._id)}
              />
            ))
          )
        }

        {
          loadingChat && <Loading/>
        }


      </div>
    </div>
  );
};

export default SidebarDrawer;