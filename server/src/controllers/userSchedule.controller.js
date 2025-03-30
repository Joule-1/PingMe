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

    const newSchedule = await userSchedule({
        user: userId,
        scheduleId,
        scheduleTitle,
        scheduleDate,
        scheduleTime,
        schedulePriority,
        scheduleDescription: scheduleDescription || "",
    });

    await newSchedule.save();

    return res
              .status(201)
              .json(
                new ApiResponse(201, newSchedule, "Schedule Created Successfully")
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
                new ApiResponse(201, schedules, "Schedule Created Successfully")
              )

});

export { addUserSchedule, getUserSchedule };
