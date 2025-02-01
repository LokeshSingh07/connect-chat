import React, { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";


const SidebarDrawer = ({ setIsSideBarOpen, setSearch, handleSearch}) => {
  const sidebarRef = useRef(null);

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
        <div className="flex gap-2">
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
      </div>
    </div>
  );
};

export default SidebarDrawer;