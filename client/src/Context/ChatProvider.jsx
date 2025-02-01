import { useNavigate } from "react-router-dom";

import { createContext, useContext, useState, useEffect } from "react";


const ChatContext = createContext();


const ChatProvider = ({children})=>{
    const [user, setUser] = useState();
    const navigate = useNavigate();


    useEffect(()=>{
        const userInfo = JSON.parse(localStorage.getItem("user"));
        setUser(userInfo);

        if(!userInfo){
            navigate("/");
        }
    },[navigate]);




    return (
        <ChatContext.Provider value={{ user, setUser }}>
            {children}
        </ChatContext.Provider>
    )
}


export const ChatState = ()=>{
    return useContext(ChatContext);
}


export default ChatProvider;