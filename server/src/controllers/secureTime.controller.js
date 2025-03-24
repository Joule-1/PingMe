import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const secureTime = asyncHandler(async (req, res) => {
    try {
        const userIp =
            req.headers["x-forwarded-for"] ||
            req.ip ||
            req.connection.remoteAddress;

        const response = await fetch(
            `https://timeapi.io/api/time/current/ip?ipAddress=${userIp}`
        );
        const timeData = await response.json();

        return res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    timeData,
                    "Secure Time Fetched Successfully"
                )
            );
    } catch (error) {
        throw new ApiError(200, "Error in fetching current time");
    }
});

export default secureTime;
