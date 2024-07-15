import React from 'react'
import { Navigate } from 'react-router-dom';



const OpenRoute = ({children}) => {
    const token = null;                 // TODO

    if(token === null){
        return children;
    }
    else{
        return <Navigate to=""/>        // TODO
    }

}

export default OpenRoute