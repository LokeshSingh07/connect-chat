const BASE_URL = import.meta.env.VITE_BASE_URL

// const USER_BASE_URL = `${BASE_URL}/api/v1/user`;



export const userEndpoints = {
    LOGIN_API: `${BASE_URL}/api/v1/user/login`,
    SIGNUP_API: BASE_URL + "/api/v1/user/signup",
    GET_ALL_USET: BASE_URL + "/api/v1/user/getAllUser"
}


export const chatEndpoints = {
    ACCESS_CHAT: BASE_URL + "/api/v1/chat/",   // create & fetch chat
    FETCH_CHAT: BASE_URL + "/api/v1/chat/",
    CREATE_GROUP_CHAT: BASE_URL + "/api/v1/chat/createGroup",
    RENAME_GROUP_CHAT: BASE_URL + "/api/v1/chat/renameGroup",
    ADD_TO_GROUP_CHAT: BASE_URL + "/api/v1/chat/addToGroup",
    REMOVE_FROM_GROUP_CHAT: BASE_URL + "/api/v1/chat/removeFromGroup",
}



export const messageEndpoints = {
    SEND_MESSAGE: BASE_URL + "/api/v1/message/",
    FETCH_MESSAGE: BASE_URL + "/api/v1/message/:chatId",
}