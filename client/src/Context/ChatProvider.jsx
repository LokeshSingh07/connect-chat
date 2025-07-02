import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";





const ChatContext = createContext();


const ChatProvider = ({children})=>{
    const [user, setUser] = useState();
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState([]);             // all chats (left side)
    const [chatUpdateTrigger, setChatUpdateTrigger] = useState(false);


    useEffect(()=>{
        const userInfo = JSON.parse(localStorage.getItem('user'));
        
        setUser(userInfo);
    },[])

    

    // ✅ Centralized reset function
    const resetChatContext = () => {
        setUser(null);
        setSelectedChat(null);
        setChats([]);
        setChatUpdateTrigger(false);
    };



    return (
        <ChatContext.Provider value={{ 
            user, 
            setUser, 
            selectedChat, 
            setSelectedChat, 
            chats, 
            setChats,
            chatUpdateTrigger,
            setChatUpdateTrigger,
            resetChatContext
        }}>
            {children}
        </ChatContext.Provider>
    )
}



export const ChatState = ()=>{
    return useContext(ChatContext);
}

export default ChatProvider;