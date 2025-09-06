import React, { useState } from 'react'
import "../../App.css";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast";
import { ChatState } from '../../Context/ChatProvider';




const LoginForm = () => {
  const {setUser} = ChatState();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const {email, password} = formData;

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleOnChange = (e)=>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.name]: e.target.value 
    }))
  }




  const handleOnSubmit = async(e)=>{
    e.preventDefault();
    setLoading(true);
    // console.log('form submitted', formData);

    try{
      const response = await axios.post(`/api/v1/user/login`, formData)

      // console.log("response: ", response);
      // console.log(response.data.data);
      localStorage.setItem('accessToken', response.data.data.accessToken);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      setUser(response.data.data.user)
      navigate('/chats');
      toast.success("Logged in")
    }
    catch(err){
      console.log(err);
      toast.error(err.response.data.data)
    }
    finally{
      setLoading(false);
    }
  }


  return (
    <div className='w-[90%] sm:w-[60%] md:w-[50%] lg:w-[45%]'>
      <form onSubmit={handleOnSubmit} className='space-y-[10px]'>
        {/* email */}
        <div>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder='Enter Email'
            className='inputField'
          />
        </div>


        {/* password */}
        <div className='relative'>
          <input
            type={showPassword? "text" : "password"}
            name= "password"
            value={password}
            onChange={handleOnChange}
            placeholder="Password"
            className='inputField'
          />
          {/* icon */}
          <span onClick={()=> setShowPassword((prev)=> !prev)}
            className='absolute right-2 top-1/2 -translate-y-1/2'
          >
            {
              showPassword ? 
              <FaEye fontSize={20} color='#ccc'/> :
              <FaEyeSlash  fontSize={20} color='#ccc'/>
            }
          </span>

        </div>


        {/* submit */}
        <button type='submit'
          className='inputField flexbox bg-green-400 font-medium'
        >
          {
            loading ? <FaSpinner className='animate-spin'/> : "Log in"
          }
        </button>

        <div onClick={()=> setFormData({email:"demo@gmail.com", password:"1212"})}
          className='inputField flexbox bg-red-500/85 font-medium text-[rgb(255,247,247)] select-none cursor-pointer'
        >
          Get Guest User Credentials
        </div>


      </form>

        
    </div>
  )
}

export default LoginForm