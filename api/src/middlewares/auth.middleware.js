import { asyncHandler } from "../utils/asyncHandler.js"
import jwt from 'jsonwebtoken';
import { ApiError } from "../utils/ApiError.js"


const verifyJWT = asyncHandler(async(req, res, next)=> {
    try{
        const accessToken = await res.cookies?.accessToken ||  req.header("Authorization")?.replace("Bearer ", "");

        if(!accessToken){
            throw next(new ApiError(404, "Unauthorized request or token not found"));
        }

        // verify the token
        const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        req.user = decode;
        next();
    }
    catch(err){
        throw new ApiError(401, err?.message ||  "Invalid Token")
    }
})

export { verifyJWT };