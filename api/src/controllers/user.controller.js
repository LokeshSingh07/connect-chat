// signup
// login
// getAllUser       /api/user/getAllUsers?search=lokesh      //search query

import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"; 



const singup = asyncHandler(async(req,res)=>{
    // get name, email, password from req.body
    // validation
    // check user exist or not
    // if user exist throw error
    // if not exist create user and send response

    const {name, email, password} = req.body;
    
    if(!name || !email || !password){
        throw new ApiError(400, "All fields are required");
    }
    
    const existedUser = await User.findOne({email});

    if(existedUser){
        throw new ApiError(403, "User already exist, please login");
    }

    const user = await User.create({ name, email, password })

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            null,
            "User registered successfully"
        )
    )
})




const login = asyncHandler(async(req,res)=>{
    // get email & password from req
    // validation
    // check user exist or not
    // if user does not exist return
    // if user exist check password
    // generate  token
    // send token in cookie
    
    const {email, password} = req.body;

    if(!email || !password){
        throw new ApiError(400, "Email or password is incorrect");
    }

    const existedUser = await User.findOne({email});

    if(!existedUser){
        throw new ApiError(403, "User is not registered");
    }

    const isPasswordCorrect = await existedUser.matchPassword(password);
    if(!isPasswordCorrect){
        throw new ApiError(403, "Invalid User credentials");
    }

    const token = await existedUser.generateAccessToken();

    const loggedInUser = await User.findById(existedUser._id)
    .select("-password ")


    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", token, options)
    .json(
        new ApiResponse(
            200,
            {   
                accessToken: token,
                user: loggedInUser
            },
            "User logged in successfully"
        )
    )
})



// /api/user/getAllUsers?search=      //search query
const getAllUser = asyncHandler(async(req,res)=>{
    const {search} = req.query
    
    const users = await User.find({
        $or: [
            {name: {$regex: search, $options: 'i'}},
            {email: {$regex: search, $options: 'i'}}
        ]
    })
    .select("-password")
    .sort({name: 1, email: 1})
    .limit(10)

    return res
    .status(200)
    .json(
        new ApiResponse(200, 
            {   
                total: users.length,
                users: users
            }, 
            "All Users fetched successfully")
    )
})






export { 
    singup, 
    login, 
    getAllUser 
};