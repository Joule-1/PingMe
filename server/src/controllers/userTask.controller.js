import UserTask from "../models/userTask.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const createTask = asyncHandler(async (req, res) => {
  const { title, description, priority, dueDate } = req.body;

  if (!title || !priority || !dueDate ) {
    throw new ApiError(400, "Title, Priority, Date, and Time are required");
  }
  const task = await UserTask.create({
    user: req.user._id,
    title,
    description,
    priority,
    dueDate
  });

  return res
    .status(201)
    .json(new ApiResponse(201, task, "Task created successfully"));
});

const getUserTasks = asyncHandler(async (req, res) => {
  const tasks = await UserTask.find({ user: req.user._id }).sort({ dueDate: 1 });

  return res
    .status(200)
    .json(new ApiResponse(200, tasks, "Tasks fetched successfully"));
});

const toggleTaskStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await UserTask.findOne({ _id: id, user: req.user._id });
  if (!task) throw new ApiError(404, "Task not found");

  task.status = task.status === "done" ? "pending" : "done";
  await task.save();

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task status updated successfully"));
});

const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deleted = await UserTask.findOneAndDelete({ _id: id, user: req.user._id });

  if (!deleted) throw new ApiError(404, "Task not found");

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Task deleted successfully"));
});


export { createTask, getUserTasks, toggleTaskStatus, deleteTask };
