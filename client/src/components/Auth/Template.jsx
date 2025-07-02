import React from 'react';
import "../common/common.css";
import Logo from "../../assets/logo.png"
import { Link } from 'react-router-dom';
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { MessageCircle, Sparkles } from 'lucide-react';



const Template = ({title, description, image, formType}) => {

  return (
    <div className={`min-h-screen flex ${formType == "login" ? "flex-row" : "flex-row-reverse"} blurBgImg`}>
        {/* leftbox */}
        <div className={`w-full lg:w-[60%] ${formType =='login' ? "slideInFromLeft" : "slideInFromRight"}`}>
            <div className='flexbox justify-between m-7'>
                {/* <div className='flexbox gap-2 cursor-pointer'>
                    <img src={Logo}
                        alt='logo'
                        loading='lazy'
                        width={25}
                    />
                    <h2 className='text-[18px] font-semibold'>Connect</h2>
                </div> */}

                {/* Logo Section */}
                <Link to={'/home'} className="flex items-center animate-slide-in-left">
                    <div className="relative">
                        <MessageCircle className="h-8 w-8 text-green-500 animate-pulse" />
                        <Sparkles className="h-4 w-4 text-green-500 absolute -top-1 -right-1 animate-bounce" />
                    </div>
                    <span className="ml-2 text-xl font-bold text-gray-800 bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                        Connect
                    </span>
                </Link>

                <div className='flexbox gap-2 text-[14px] select-none'>
                    <p>
                        {
                            formType == "login" ? "Don't have an account?" : "have an account?"
                        }
                    </p>
                    <div className='text-green-500 hover:text-green-600 transition-all delay-100'>     
                        {
                            formType == "login" ? <Link to="/signup">sign up!</Link> : <Link to="/">login!</Link>
                        }
                    </div>
                </div>
            </div>

            <div className=' mx-auto flexbox flex-col mt-8 select-none'>
                <h1 className='heading'>{title}</h1>
                <p className='fadedText mb-10'>{description}</p>
                {
                    formType == "login" ? <LoginForm/> : <SignupForm/>
                }
            </div>
        </div>

        {/* rightbox */}
        <div className={`hidden lg:block lg:w-[40%] ${formType =='login' ? "slideInFromRight" : "slideInFromLeft"}`}>
            <img 
                src={image}
                alt={`${formType == "signup" ? "signup image" : "login image"}`}
                loading="lazy"
                className='w-full h-screen object-cover relative '
            />
        </div>


    </div>
  )
}

export default Template