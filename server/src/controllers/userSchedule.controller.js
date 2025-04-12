import userSchedule from "../models/userSchedule.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const addUserSchedule = asyncHandler(async function (req, res) {
    const {
        scheduleId,
        scheduleTitle,
        scheduleDate,
        scheduleTime,
        schedulePriority,
        scheduleDescription,
    } = req.body;
    const userId = req.user._id;
    
    console.log("📦 body:", req.body);
console.log("👤 user:", req.user);

    if (
        [
            scheduleId,
            scheduleTitle,
            scheduleDate,
            scheduleTime,
            schedulePriority,
        ].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(200, "All fields are required");
    }
    console.log("Hey in Backend Server1")
    const newSchedule = await userSchedule({
        user: userId,
        scheduleId,
        scheduleTitle,
        scheduleDate,
        scheduleTime,
        schedulePriority,
        scheduleDescription: scheduleDescription || "",
    });
    console.log("Hey in Backend Server2")

    try{
        await newSchedule.save();
    }
    catch(error){
        throw new ApiError(200, "Failed to Save User to Database")
    }

    console.log("Hey in Backend Server3")
    return res
              .status(201)
              .json(
                new ApiResponse(201, newSchedule, "Schedule Added Successfully")
              )
});

const getUserSchedule = asyncHandler(async function (req, res) {
    const userId = req.user._id;
    const schedules = await userSchedule.find({user: userId});

    if(!schedules.length){
        throw new ApiError(200, "No Schedule Found");
    }

    return res
              .status(201)
              .json(
                new ApiResponse(201, schedules, "Schedule Retrieved Successfully")
              )

});

export { addUserSchedule, getUserSchedule };
