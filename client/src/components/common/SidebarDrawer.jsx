import React, { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import axios from 'axios';
import ChatLoading from "../miscellaneous/ChatLoading";
import UserListItem from "../core/Chats/UserListItem";
import { ChatState } from "../../Context/ChatProvider";
import toast from "react-hot-toast";


const SidebarDrawer = ({ setIsSideBarOpen }) => {
  const sidebarRef = useRef(null);
  const  accessToken  = localStorage.getItem("accessToken");
  
  const [ search, setSearch ] = useState("");
  const [ searchResults, setSearchResults ] = useState([ ]);
  const [ loading, setLoading ] = useState(false);
  const [ loadingChat, setLoadingChat ] = useState();
  const { selectedChat, setSelectedChat, chats, setChats } = ChatState();



  const handleSearch = async()=>{
    if(!search){
        toast.error("Please Enter something in search", {
            position: "top-left"
        })
        return;
    }

    try{
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/user/getAllUser?search=${search}`, {
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



  const accessChat = async(userId)=>{
    try{
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        }
      }
      
      const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/chat`, {userId}, config);
      
      // catch
      // if(!chats.find((c)=> c._id === data._id)){
      //   setChats([data, ...chats]);
      // }
      setSelectedChat(data);
      console.log("access chat : ", data);
    }
    catch(err){
      toast("Error fetching the chat, access chat");
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex">
      <div className="relative w-80 bg-white h-full shadow-xl p-6" ref={sidebarRef}>
        <h2 className="text-xl font-semibold mb-4">Search Users</h2>
        <button onClick={()=> setIsSideBarOpen(false)} className="absolute right-5 top-5 hover:bg-slate-200 rounded-md transition-all duration-30"><IoClose fontSize={24}/></button>
        <div className="flex gap-2 mb-4">
          <input 
            type="text" 
            placeholder="Search by name or email"
            onChange={(e)=> setSearch(e.target.value)}
            className="w-full py-2 px-3 border border-gray-300 rounded-lg text-sm"
            required
          />
          <button onClick={() => {
              handleSearch()
            }} 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Go</button>
        </div>

        {
          
          loading ? 
          <ChatLoading/> :
          (
            searchResults?.map((ele)=>(
              <UserListItem
                key={ele._id}
                user={ele}
                handleFunction={()=> accessChat(ele._id)}
              />
            ))
          )

        }

      </div>
    </div>
  );
};

export default SidebarDrawer;