import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError}  from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
    // res.status({,
    //     message: "ankit"
    // })

    // 1. get user details from fronted
    const {fullName, email, username, password}= req.body
    // console.log("email: ",email);
    
    // 2. validation - not empty
    if([fullName, email, username, password].some((field) => field?.trim()==="")
    ){
        throw new ApiError(400, "All fields  are required")
    }
    // if(fullName===""){
    //     throw new ApiError(400, "fullName is required")
    // }

    // 3. check if user already exists: username, email
    const existedUser =  await User.findOne({
        $or: [{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username already exists")
    }

    // console.log(req.files);
    

    // 4. check for images, check for avatar
    // const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0].coverImage?.path;

    let avatarLocalPath;
    if(req.files && Array.isArray(req.files.avatar) && req.files.avatar.length> 0){
        avatarLocalPath = req.files.avatar[0].path
    }
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length> 0){
        coverImageLocalPath = req.files.coverImage[0].path
    }


    // 5. upload them to cloudinary, avatar
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)





    // 6.create a object - create entry in db
    const user = await User.create({
        fullName,
        avatar: avatar?.url || "",
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )



})

const loginUser = asyncHandler(async (req, res) => {
    // req body -> data
    const {email,username, password} = req.body

    // username or email
    // if(!username || !email){
    //     throw new ApiError(400, "email or username  are required")
    // }
    if(!email){
        throw new ApiError(400, "email  is required")
    }
    // find the user
    const user = User.findOne({
        $or: [{username}, {email}]
    })

    if(!user){
        throw new ApiError(404, "User does not exist")
    }
    // password check
    const isPasswordValid = await user.isPasswordCorrect(password)
    
    if(!isPasswordValid){
        throw new ApiError(401, "Password incorrect")
    }
    // access and refresh token
    // send cookie
})

export { 
    registerUser,
    loginUser
 }