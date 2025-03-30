import mongoose, { Schema } from "mongoose";

const userScheduleSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        scheduleId: {
            type: String,
            trim: true,
            required: [true, "Schedule Id is Required"],
        },
        scheduleTitle: {
            type: String,
            trim: true,
            required: [true, "Schedule Title is Required"],
            minlength: [3, "Minlength must be at least 3 characters long"],
            maxlength: [100, "Maxlength cannot exceed 100 characters"],
        },
        scheduleDate: {
            type: Date,
            required: [true, "Schedule Date is Required"],
        },
        scheduleTime: {
            type: Date,
            required: [true, "Schedule Time is Required"],
        },
        schedulePriority: {
            type: String,
            trim: true,
            required: [true, "Schedule Priority is Required"],
            minlength: [3, "Minlength must be at least 3 characters long"],
            maxlength: [8, "Maxlength cannot exceed 8 characters"],
        },
        scheduleDescription: {
            type: String,
            trim: true,
            minlength: [6, "Minlength must be at least 6 characters long"],
            maxlength: [500, "Maxlength cannot exceed 500 characters"],
        },
    },
    {
        timestamps: true,
    }
);

const userSchedule = mongoose.model("UserSchedule", userScheduleSchema);

export default userSchedule;
