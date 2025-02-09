import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";





const ChatContext = createContext();


const ChatProvider = ({children})=>{
    const [user, setUser] = useState();
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState([]);

    const navigate = useNavigate();


    useEffect(()=>{
        const userInfo = JSON.parse(localStorage.getItem('user'));
        setUser(userInfo);
        // console.log("userInfo : ", userInfo)
        if(userInfo == null){
            navigate('/chats');
        }

    },[]);




    return (
        <ChatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}>
            {children}
        </ChatContext.Provider>
    )
}



export const ChatState = ()=>{
    return useContext(ChatContext);
}

export default ChatProvider;