import React from 'react'
import "../../App.css";
import { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';



const SignupForm = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleOnChange = (e)=>{
    setFormData((prevState)=> ({
      ...prevState, 
      [e.target.name]: e.target.value})
    )
  }

  const handleOnSubmit = async(e)=>{
    e.preventDefault();
    // console.log(formData);
    
    // check password and cofirm password
    if(formData.password !== formData.confirmPassword){
      toast.error("Password and Confirm Password does not match");
      return;
    }
    
    setLoading(true);
    try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/user/signup`, formData);

      // console.log(response.data);
      navigate("/");
      toast.success("Account created");
    }
    catch(err){
      console.log(err);
    }
    setLoading(false);
  }


    return (
    <div className='w-[90%] sm:w-[60%] lg:w-[45%]'>
      <form onSubmit={handleOnSubmit} className='space-y-[10px]'>
        {/* full name */}
        <div>
          <input
            required
            type="text"
            name="name"
            value={formData.name}
            onChange={handleOnChange}
            placeholder="Full Name"
            className='inputField'
          />
        </div>


        {/* Email */}
        <div>
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={handleOnChange}
            placeholder="Enter Email"
            className='inputField'
          />
        </div>



        {/* Password */}
        <div className='relative'>
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleOnChange}
            placeholder="Password"
            className='inputField'
          />
          {/* icon */}
          <span onClick={()=> setShowPassword((prev)=> !prev)}
            className='absolute top-[17px] right-[20px]'  
          >
            {
              showPassword ? 
              <FaEye fontSize={20} color='#ccc'/> :
              <FaEyeSlash  fontSize={20} color='#ccc'/>
            }
          </span>
        </div>



        {/* confirmPassword */}
        <div className='relative'>
          <input
            required
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleOnChange}
            placeholder="Confirm Password"
            className='inputField'
          />  
          {/* icon */}
          <span onClick={()=> setShowConfirmPassword((prev) => !prev)}
            className='absolute top-[17px] right-[20px]'
          >
            {
              showConfirmPassword ?
              <FaEye fontSize={20} color='#ccc'/> :
              <FaEyeSlash  fontSize={20} color='#ccc'/>
            }
          </span>
        </div>



        {/* submit button */}
        <button type='submit'
          className='inputField bg-green-400 flexbox font-medium'
        >
          {
            loading ? <FaSpinner className='animate-spin'/> : "Create Account"
          }
        </button>



      </form>

    </div>
  )
}

export default SignupForm