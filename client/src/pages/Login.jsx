import React from 'react'
import Template from '../components/Auth/Template'
import LoginImg from "../assets/login.png";

const Login = () => {

  return (
    <div>
        <Template
            title="Welcome Back"
            description="Login into your account"
            image={LoginImg}
            formType={"login"}
        />
    </div>
  )
}

export default Login