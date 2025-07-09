import UserTask from "../models/userTask.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const getDashboardStats = asyncHandler(async (req, res) => {
    const tasks = await UserTask.find({ user: req.user._id });

    if(!tasks)
        throw new ApiError(404, "Tasks or user not found")

    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    const total = tasks.length;
    const completed = tasks.filter((task) => task.status === "done").length;
    const inProgress = tasks.filter((task) => task.status !== "done").length;
    const overdue = tasks.filter(
        (task) => task.dueDate < today && task.status !== "done"
    ).length;

    const todayTasks = tasks.filter((task) => {
        const due = new Date(task.dueDate);
        due.setHours(0, 0, 0, 0);  
        return due.getTime() === today.getTime();
    });

    const upcoming = tasks.filter((task) => {
        const due = new Date(task.dueDate);
        const now = new Date();
        const diff = (due - now) / (1000 * 60 * 60 * 24);
        return diff > 0 && diff <= 7;
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                total,
                completed,
                inProgress,
                overdue,
                todayTasks,
                upcoming,
            },
            "Dashboard data fetched successfully"
        )
    );
});

export { getDashboardStats };
