import React from 'react';
import "../components/common/common.css";


const ErrorPage = () => {
  return (
    <div className="blurBgImg w-full h-screen flexbox">
      <div className="text-[3rem] font-bold ">
        OOPS! Error 404
        <br />
        Page not found
      </div>
    </div>
  );
}

export default ErrorPage