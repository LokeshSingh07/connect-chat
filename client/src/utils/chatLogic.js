
export const getSender = (chat, loggedInUserId)=>{
    // console.log(chat);
    return chat?.users[0]?._id === loggedInUserId ? chat?.users[1]?.name : chat?.users[0]?.name
}

export const getImage=  (chat, loggedInUserId)=>{
    return chat.isGroupChat
    ? `https://ui-avatars.com/api/?name=${chat.chatName}` : 
    chat?.users[0]?._id === loggedInUserId ? chat?.users[1]?.pic : chat?.users[0]?.pic
}