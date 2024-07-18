import React from 'react';
import { useNavigate } from "react-router-dom";
import "../App.css"
import toast from 'react-hot-toast';




const Home = () => {
  const navigate = useNavigate();

  const logout = ()=>{
    localStorage.removeItem('accessToken')
    navigate('/');
    toast.success("logged out")
  }


  return (
    <div>
      
      <div className='w-[200px]'>
        <button onClick={logout} className='inputField bg-red-400 font-medium'>
          logout
        </button>
      </div>







    </div>
  )
}

export default Home