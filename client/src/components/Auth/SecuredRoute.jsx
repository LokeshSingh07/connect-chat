import React from 'react'
import { Navigate } from 'react-router-dom';



const SecuredRoute = ({children}) => {
    const token = "";                 // TODO

    if(token !== null){
        return children;
    }
    else{
        return <Navigate to=""/>       // TODO
    }
}

export default SecuredRoute