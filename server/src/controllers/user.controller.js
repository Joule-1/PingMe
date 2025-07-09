import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
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
        throw new ApiError(400, "Something went wrong while generating tokens");
    }
};

const registerUser = asyncHandler(async function (req, res) {
    const { name, email, password, avatar } = req.body;

    if ([name, email, password, avatar].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required.");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) throw new ApiError(400, "User already exists.");

    const user = await User({
        name,
        email,
        password,
        avatar,
    });

    try {
        await user.validate();
        await user.save();
    } catch (error) {
        const firstError =
            error.errors.avatar ||
            error.errors.email ||
            error.errors.password ||
            error.errors.name;

        throw new ApiError(400, firstError.properties.message);
    }

    const { accessToken, refreshToken } =
        await generateAccessTokenAndRefreshToken(user._id);

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser)
        throw new ApiError(
            400,
            "Something Went Wrong While Registering The User"
        );

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
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
    const { email, password } = req.body;

    if (!email || !password)
        throw new ApiError(400, "Email and Password are required");

    const user = await User.findOne({
        email,
    });

    if (!user) throw new ApiError(400, "User doesn't exist");

    const passwordExist = await user.isPasswordCorrect(password);

    if (!passwordExist) throw new ApiError(400, "Password isn't correct");

    const { accessToken, refreshToken } =
        await generateAccessTokenAndRefreshToken(user._id); // refreshToken is saved to DB inside this function only

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
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
        sameSite: "strict",
    };

    return res
        .status(201)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(201, {}, "User Logged Out Successfully"));
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

export {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    authenticateUser,
};
