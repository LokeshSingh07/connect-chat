import React from "react";



const ProfileModal = ({ setIsOpen, userInfo, children }) => {


  return (
    <div>
      {
        children ?? (<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="flex flex-col items-center justify-center  bg-white p-6 rounded-2xl shadow-xl min-w-80 md:w-96">
          <h2 className="text-xl font-semibold mb-4 select-none">Profile</h2>
          <img src={`https://avatar.iran.liara.run/username?username=${userInfo?.name}`} className="w-24 h-24 object-cover rounded-full select-none"/>
          <p className="text-gray-600 text-[18px] capitalize font-medium">{userInfo?.name}</p>
          <p className="text-gray-600 ">{userInfo?.email}</p>
          <p className="text-gray-600 mt-1">{userInfo?.bio || "Everything happens for a reason"}</p>
          <p className="text-gray-600 text-xs">{new Date(userInfo?.createdAt).toLocaleString('en-US', {year:'numeric', month: 'long', day: 'numeric'})}</p>
          <div className="mt-4 flex justify-end">
            <button onClick={() => setIsOpen(false)} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg select-none">Close</button>
          </div>
        </div>
      </div>)
      }
    </div>
  );
};

export default ProfileModal;
