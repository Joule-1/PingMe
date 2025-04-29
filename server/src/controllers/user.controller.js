import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const generateAccessTokenAndRefreshToken = async function (userId) {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(200, "Something went wrong while generating tokens");
    }
};

const registerUser = asyncHandler(async function (req, res) {
    //  get user details from frontend
    //  validation - not empty
    //  check if user already exists
    //  check for images if there local path exist
    //  upload them on cloudinary
    //  check if image uploaded on cloudinary
    //  create user object
    //  remove password and refresh token field from response
    //  check if user created
    //  return response

    const { fullname, email, password, googleSignUp } = req.body;

    if((password == "g*0oleU5erpa$swOord" && googleSignUp == false) || (password != "g*0oleU5erpa$swOord" && googleSignUp == true)){
        throw new ApiError(200, "System Arbitration.");
    }   

    if ([fullname, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(200, "All fields are required.");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) throw new ApiError(200, "User already exists.");

    let userImageLocalPath;
    if (
        req.files &&
        Array.isArray(req.files.userImage) &&
        req.files.userImage.length > 0
    )
        userImageLocalPath = req.files.userImage[0].path;

    const uploadUserImage = await uploadOnCloudinary(userImageLocalPath);

    const user = await User({
        fullname,
        email,
        userImage: uploadUserImage?.url || "",
        password,
        googleSignUp
    });

    console.log(user._id);

    try {
        await user.validate();
        await user.save();
    } catch (error) {
        const firstError =
            error.errors.fullname ||
            error.errors.email ||
            error.errors.password ||
            error.errors.googleSignUp;

        throw new ApiError(200, firstError.properties.message);
    }

    const { accessToken, refreshToken } =
        await generateAccessTokenAndRefreshToken(user._id);

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser)
        throw new ApiError(
            200,
            "Something Went Wrong While Registering The User"
        );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(201, createdUser, "User Registered Successfully")
        );
});

const loginUser = asyncHandler(async function (req, res) {
    //  req.body -> data
    //  find the user by email
    //  check password
    //  generate refresh token and generate access token
    //  save refresh token in db
    //  return response after removing password and refresh token with cookie

    const { email, password, googleSignUp } = req.body;

    if((password == "g*0oleU5erpa$swOord" && googleSignUp == false) || (password != "g*0oleU5erpa$swOord" && googleSignUp == true)){
        throw new ApiError(200, "System Arbitration.");
    }


    if (!email || !password)
        throw new ApiError(200, "Email and Password are required");

    const user = await User.findOne({
        email,
    });

    if (!user) throw new ApiError(200, "User doesn't exist");
    console.log(password)
    const passwordExist = await user.isPasswordCorrect(password);

    if (!passwordExist) throw new ApiError(200, "Password doesn't exist");

    const { accessToken, refreshToken } =
        await generateAccessTokenAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                201,
                {
                    loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "User Logged In Successfully"
            )
        );
});

const logoutUser = asyncHandler(async function (req, res) {
    await User.findByIdAndUpdate(
        req.user_id,
        {
            $unset: {
                refreshToken: 1,
            },
        },
        {
            new: true,
        }
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(201)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(201, {}, "User Logged Out Successfully"));
});

const refreshAccessToken = asyncHandler(async function (req, res) {
    const incomingRefreshToken =
        req.body.refreshToken || req.cookies.refreshToken;

    if (!incomingRefreshToken) throw ApiError(200, "Unauthorized Request");

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = User.findById(decodedToken?._id);

        if (user?.refreshToken !== incomingRefreshToken)
            throw ApiError(200, "Refresh token is expired or used");

        const { accessToken, newRefreshToken } =
            await generateAccessTokenAndRefreshToken(user?._id);

        const options = {
            httpOnly: true,
            secure: true,
        };

        return res
            .status(201)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    201,
                    {
                        accessToken,
                        refreshToken: newRefreshToken,
                    },
                    "Access Token Refresh"
                )
            );
    } catch (error) {
        throw ApiError(200, error?.message || "Invalid Refresh Token");
    }
});

const getCurrentUser = asyncHandler(async function (req, res) {
    return res
        .status(201)
        .json(new ApiResponse(201, req.user, "User Fetched Successfully"));
});

const authenticateUser = asyncHandler(async function (req, res) {
    const { _id } = req.body;

    if (!_id) {
        throw new ApiError(200, "User ID not present");
    }

    const user = await User.findById(_id).select("-password -refreshToken");

    if (!user) throw new ApiError(200, "User doesn't exist");

    return res
        .status(201)
        .json(
            new ApiResponse(201, req.user, "User Authenticated Successfully")
        );
});

const changeCurrentPassword = asyncHandler(async function (req, res) {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user?._id);

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) throw new ApiError(200, "Invalid User Password");

    user.password = password;
    await user.save({
        validateBeforeSave: false,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, {}, "User Password Updated Successfully"));
});

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser,
    authenticateUser,
    changeCurrentPassword,
};
