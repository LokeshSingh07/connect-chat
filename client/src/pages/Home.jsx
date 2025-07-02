import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "../App.css"
import toast from 'react-hot-toast';
import { LandingPage } from '../components/core/Home/LandingPage';
import Footer from '../components/core/Home/Footer';
import CTASection from '../components/core/Home/CTA';
import AppBar from '../components/core/AppBar';




const Home = () => {


  return (
    <div>
      <AppBar/>
      <LandingPage/>

      <CTASection/>
      <Footer/>

    </div>
  )
}

export default Home