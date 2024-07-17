import React from 'react'
import { Navigate } from 'react-router-dom';



const SecuredRoute = ({children}) => {
    const token = localStorage.getItem('accessToken');

    if(token !== null){
        return children;
    }
    else{
        return <Navigate to="/home"/>       // TODO
    }
}

export default SecuredRoute