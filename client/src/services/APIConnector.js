import axios from "axios";


export const instance = axios.create({})

export const APIConnector = (method, url, bodyData, headers, params)=>{
    return instance({
        method: `${method}`,
        url: `${url}`,
        data: bodyData ? bodyData: null,
        headers: headers ? headers : null,
        params: params ? params : null
    });
}