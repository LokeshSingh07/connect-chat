import React from 'react'
import Template from '../components/Auth/Template'
import SignupImg from "../assets/signup.png"

const Signup = () => {

  return (
    <div>
        <Template
            title="Sign Up for free"
            description="Getting started is easy"
            image={SignupImg}
            formType={"signup"}
        />
    </div>
  )
}

export default Signup