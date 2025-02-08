

import React from 'react'

function ChatLoading() {
  return (
    <>
        <UserSkelton/>
        <UserSkelton/>
        <UserSkelton/>
        <UserSkelton/>
        <UserSkelton/>
        <UserSkelton/>
        <UserSkelton/>
        <UserSkelton/>
    
    </>
  )
}



function UserSkelton(){
    return (
        <div className="flex items-center gap-4 px-4 py-2 border rounded-lg shadow-md w-full max-w-md animate-pulse">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
        </div>
    )
}

export default ChatLoading