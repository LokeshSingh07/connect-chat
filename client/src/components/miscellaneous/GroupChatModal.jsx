import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { ChatState } from '../../Context/ChatProvider';
import axios from 'axios';
import UserListItem from '../common/UserListItem';
import UserBadgeItem from '../common/UserBadgeItem';
import Loading from '../common/Loading';
import { FaSearch, FaUsers } from 'react-icons/fa';




function GroupChatModal({setIsOpen, selectedChat = null, isCreatingGroupChat = false}) {
    const [originalGroupName, setOriginalGroupName] = useState("");
    const [groupChatName, setGroupChatName] = useState("");
    const [selectedUser, setSelectedUser] = useState([])

    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const {chats, setChats, setSelectedChat, user, chatUpdateTrigger, setChatUpdateTrigger} = ChatState();
    const  accessToken  = localStorage.getItem("accessToken");
    
    const isEditMode = user?._id == selectedChat?.groupAdmin;

    console.log("selectedChat : ", selectedChat)
    // console.log("userid : ", user)
    // edit
    useEffect(() => {
        if (!isCreatingGroupChat && selectedChat) {
            setGroupChatName(selectedChat?.chatName);
            setSelectedUser(selectedChat.users);
            setOriginalGroupName(selectedChat.chatName);
        }
    }, [isCreatingGroupChat, selectedChat]);


    // search + debounce
    const handleSearch = async(query)=>{
        setSearch(query)
    }

    const fetchUsers = async(query)=>{
        try{
            setLoading(true);
            const config = {headers: {Authorization: `Bearer ${accessToken}`}}

            const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/user/getAllUser?search=${query}`, config)
            console.log("data : ", data);
            setSearchResults(data.data.users);

        }
        catch(err){
            toast.error("Something is wrong");
            console.log(err);
        }
        finally{
            setLoading(false);
        }
    }


    useEffect(()=>{
        if(!search){
            setSearchResults([])
            return;
        }

        const delayDebounce = setTimeout(()=>{
            fetchUsers(search);
        }, 500);

        return ()=> clearTimeout(delayDebounce);
    },[search])


    // add member to the group
    const handleAddToGroup = async(userToAdd)=>{
        if(selectedUser.some((u)=> (u._id === userToAdd._id))){
            toast.error("user already added")
            return
        }
        
        setSelectedUser([...selectedUser, userToAdd]);
        setSearch("");
        setSearchResults([]);
        setSelectedChat({
            ...selectedChat,
            users: [...selectedChat.users, userToAdd]
        })


        // API CALL
        if(isEditMode){
            try{
                setLoading(true);
                const config = { headers: { Authorization: `Bearer ${accessToken}` }}
    
                const { data } = await axios.patch(`${import.meta.env.VITE_BASE_URL}/api/v1/chat/addToGroup`,
                    {
                        chatId: selectedChat._id,
                        userId: userToAdd._id,
                    },
                    config
                );
                console.log("data : ", data);
                toast.success("Added to the group")
    
            }
            catch(err){
                toast.error("Something is wrong");
                console.log(err);
            }
            finally{
                setLoading(false);
            }
        }
    }

    // remove member from the group
    const handleDelete = async(userToRemove) => {
        if(!isEditMode) return;


        const idToRemove = userToRemove._id;
        setSelectedUser((prevUsers) =>
            prevUsers.filter((u) => u._id != idToRemove)
        );
        setSelectedChat({
            ...selectedChat,
            users: [...selectedChat.users.filter((user)=> user._id != idToRemove)]
        })

        // API CALL
        if(isEditMode){
            try{
                setLoading(true);
                const config = { headers: { Authorization: `Bearer ${accessToken}` }}
    
                const { data } = await axios.patch(`${import.meta.env.VITE_BASE_URL}/api/v1/chat/removeFromGroup`,
                    {
                        chatId: selectedChat._id,
                        userId: userToRemove._id,
                    },
                    config
                );
                console.log("data : ", data);
                
                toast.success("Remove from the group")
    
            }
            catch(err){
                toast.error("Something is wrong");
                console.log(err);
            }
            finally{
                setLoading(false);
            }
        }
    };


    const isUpdateNeeded = () => {
        if (groupChatName !== originalGroupName) return true;
        return false;
    };



    const handleSubmit = async()=>{
        if(!groupChatName ||  selectedUser.length == 0){
            toast.error("All fields are required");
            return;
        }
        if(selectedUser.length < 2){
            toast.error("Atleast 3 user be required to create a group");
            return;
        }


        const config = { headers: { Authorization: `Bearer ${accessToken}` } }    
        
        try{
            if(!isCreatingGroupChat && isEditMode && selectedChat){
                // 🔄 Update existing group name
                const { data } = await axios.patch(`${import.meta.env.VITE_BASE_URL}/api/v1/chat/renameGroup`,
                    {
                        chatId: selectedChat._id,
                        chatName: groupChatName,
                    },
                    config
                );
                
                setChats([data, ...chats])          // bcz we want it to the top
                setIsOpen(false);
                setSelectedChat({
                    ...selectedChat,
                    chatName: data?.data?.chatName
                })

                // ✅ Inform ChatBox to refetch chats
                setChatUpdateTrigger(prev => !prev);
                
                toast.success("Group updated successfully");
            }
            else{
                const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/chat/createGroup`, {
                    chatName: groupChatName,
                    users: JSON.stringify(selectedUser.map(u => u._id))
                }, config)
                
                // setChats([...chats, data])       //
                setChats([data, ...chats])          // bcz we want it to the top
                setIsOpen(false);

                // ✅ Inform ChatBox to refetch chats
                setChatUpdateTrigger(prev => !prev);

                toast.success("New Group chat created");
            }
        }
        catch(err){
            toast.error("Something is wrong");
            console.log(err);
        }
    }


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="flex flex-col items-center justify-center  bg-white p-6 rounded-2xl shadow-xl min-w-80 md:w-96">
            <div className='w-full flex justify-between items-center mb-4'>
                <h2 className="text-xl font-semibold select-none">
                    {
                        isCreatingGroupChat ? "Create group chats" : "Group details"
                    }
                </h2>
                <button onClick={() => setIsOpen(false)} className="hover:text-red-400 select-none">Close</button>
            </div>
            
            <div className='w-full flex flex-col space-y-2'>
                {/* input */}
                <div className='flex gap-2'>
                    <div className="relative w-full">
                        <input
                            disabled={!isEditMode}
                            type="text" 
                            placeholder="Group chat name"
                            value={groupChatName}
                            onChange={(e) => setGroupChatName(e.target.value)}
                            className="w-full py-2 px-3 pl-10 border border-gray-300 rounded-lg text-sm"
                            required
                        />
                        <FaUsers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    </div>
                    
                    {!isCreatingGroupChat && isEditMode &&
                    (<button
                        disabled={!isUpdateNeeded()}
                        onClick={handleSubmit}
                        className={`px-4 py-2 rounded-lg text-white select-none transition 
                        ${!isUpdateNeeded()
                            ? "bg-gray-400 cursor-not-allowed" 
                            : "bg-blue-600 hover:bg-blue-700 cursor-pointer"}`}
                    >
                        Update
                    </button>
                    )}
                </div>

                {/* selected user */}
                <div className='flex gap-1 flex-wrap'>
                    {
                        [...selectedUser]
                        .sort((a, b) => (a._id === selectedChat?.groupAdmin ? -1 : b._id === selectedChat?.groupAdmin ? 1 : 0))
                        .map((user)=>(
                            <UserBadgeItem
                                key={user._id} 
                                user={user} 
                                groupAdminId={selectedChat?.groupAdmin}
                                handleDelete={()=> handleDelete(user)}
                                isCreatingGroupChat={isCreatingGroupChat}
                            />
                        ))
                    }
                </div>
                
                {/* Search bar and Members */}
                {(isCreatingGroupChat || isEditMode) && 
                (<div>
                    <div className="flex gap-2 mb-4">
                        <div className="relative w-full">
                            <input 
                                type="text" 
                                placeholder="Search users"
                                onChange={(e) => handleSearch(e.target.value)}
                                value={search}
                                className="w-full py-2 px-3 pl-10 border border-gray-300 rounded-lg text-sm"
                                required
                            />
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                        </div>
                    </div>
    
                    {/* Seached user */}
                    {loading ? 
                        <div className='flex items-center justify-center'><Loading/></div> : 
                        <div>{searchResults?.slice(0,4).map((user)=> (
                            <UserListItem key={user._id} user={user} handleFunction={()=> handleAddToGroup(user)}/>
                        ))}</div>
                    }
                </div>
                )}
            </div>
            
            
            {/* Create or Leave Group */}
            <div className="mt-4 w-full flex justify-end  gap-2">
                {
                    isCreatingGroupChat &&
                    <button
                    disabled={!groupChatName || selectedUser.length < 2}
                    onClick={()=> handleSubmit()}
                        className={`px-4 py-2 rounded-lg text-white select-none transition 
                            ${!groupChatName || selectedUser.length < 2
                            ? "bg-gray-400 cursor-not-allowed" 
                            : "bg-blue-600 hover:bg-blue-700 cursor-pointer"}`}
                    >
                        Create
                    </button>
                }
                {
                    !isCreatingGroupChat && isEditMode && 
                    <button
                        onClick={()=> { }}
                        className='px-4 py-2 rounded-lg text-white select-none transition bg-red-500 hover:bg-red-600'
                    >
                        Leave Group
                    </button>
                }
                
            </div>
        </div>
    </div>
  )
}

export default GroupChatModal