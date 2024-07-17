import React from 'react'
import "../../App.css";
import { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";



const SignupForm = () => {

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);



  const handleOnChange = (e)=>{
    setFormData((prevState)=> ({
      ...prevState, 
      [e.target.name]: e.target.value})
    )
  }

  const handleOnSubmit = (e)=>{
    e.preventDefault();
    console.log(formData);

  }


    return (
    <div className='w-[90%] sm:w-[60%] lg:w-[40%]'>
      <form onSubmit={handleOnSubmit} className='space-y-[10px]'>
        {/* full name */}
        <div>
          <input
            required
            type="text"
            name="fullName"
            value={formData.fullName}
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
          className='inputField bg-green-400 font-medium'
        >
          Create Account
        </button>



      </form>

    </div>
  )
}

export default SignupForm