import React from "react";



const ProfileModal = ({ setIsOpen, userInfo, children }) => {


  return (
    <div className="z-20">
      {
        children ?? (<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="flex flex-col items-center justify-center  bg-white p-6 rounded-2xl shadow-xl min-w-80 md:w-96">
          <h2 className="text-xl font-semibold mb-4 select-none">Profile</h2>
          <div className="w-fit h-fit bg-slate-100  rounded-full p-1">
            <img src={`https://avatar.iran.liara.run/username?username=${userInfo?.name}`} className="w-24 h-24 object-cover rounded-full select-none"/>
          </div>
          <p className="text-gray-800 text-lg capitalize font-medium">{userInfo?.name}</p>
          <p className="text-gray-600 ">{userInfo?.email}</p>
          <p className="text-gray-700 mt-1">{userInfo?.bio || "Everything happens for a reason"}</p>
          <p className="text-gray-400 text-xs">{new Date(userInfo?.createdAt).toLocaleString('en-US', {year:'numeric', month: 'long', day: 'numeric'})}</p>
          <div className="mt-4 flex justify-end">
            <button onClick={() => setIsOpen(false)}className="px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:brightness-110 text-white rounded-lg shadow-sm transition-all duration-200 select-none">Close</button>
          </div>
        </div>
      </div>)
      }
    </div>
  );
};

export default ProfileModal;
