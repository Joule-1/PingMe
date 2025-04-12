import UserSchedule from "../models/userSchedule.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const addUserSchedule = asyncHandler(async function (req, res) {
    const {
        id: scheduleId,
        title: scheduleTitle,
        date: scheduleDate,
        time: scheduleTime,
        priority: schedulePriority,
        description: scheduleDescription,
    } = req.body;
    const userId = req.user._id;
      
    const newSchedule = await UserSchedule({
        user: userId,
        scheduleId,
        scheduleTitle,
        scheduleDate,
        scheduleTime,
        schedulePriority,
        scheduleDescription: scheduleDescription || "",
    });
     
    if(!newSchedule){
        throw new ApiError(200, "Failed To Make Schedule Model")
    }
    
    try {
        await newSchedule.save();
    } catch (err) {
        throw new ApiError(200, err._message);
        
    }
    
    return res
              .status(201)
              .json(
                new ApiResponse(201, newSchedule, "Schedule Added Successfully")
              )
});

const getUserSchedule = asyncHandler(async function (req, res) {
    const userId = req.user._id;
    const schedules = await UserSchedule.find({user: userId});

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
