import mongoose, { Schema } from "mongoose";

const userScheduleSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User reference is required"],
        },
        scheduleId: { 
            type: String,
            trim: true,
            required: [true, "Schedule Id can't be empty"],
        },
        scheduleTitle: {
            type: String,
            trim: true,
            required: [true, "Schedule Title can't be empty"],
            minlength: [3, "Minlength of Schedule Title must be at least 3 characters long"],
            maxlength: [100, "Maxlength of Schedule Title cannot exceed 100 characters"],
        },
        scheduleDate: {
            type: String,
            required: [true, "Schedule Date can't be empty"],
        },
        scheduleTime: {
            type: String,
            required: [true, "Schedule Time can't be empty"],
        },
        schedulePriority: {
            type: String,
            enum: ["Extreme", "Moderate", "Low"],
            required: [true, "Schedule Priority can't be empty"],
        },
        scheduleDescription: {
            type: String,
            trim: true,
            maxlength: [500, "Maxlength of Schedule Description cannot exceed 500 characters"],
        },
    },
    {
        timestamps: true,
    }
);

const UserSchedule = mongoose.model("UserSchedule", userScheduleSchema);

export default UserSchedule;
