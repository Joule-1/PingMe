import UserTask from "../models/userTask.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// Create Task
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

// Get All Tasks for Logged In User
const getUserTasks = asyncHandler(async (req, res) => {
  const tasks = await UserTask.find({ user: req.user._id }).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, tasks, "Tasks fetched successfully"));
});

// Toggle Task Status (Pending <-> Done)
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

// Delete Task
const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deleted = await UserTask.findOneAndDelete({ _id: id, user: req.user._id });

  if (!deleted) throw new ApiError(404, "Task not found");

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Task deleted successfully"));
});

const getDashboardStats = asyncHandler(async (req, res) => {
  const tasks = await UserTask.find({ user: req.user._id });

  const today = new Date().toISOString().split("T")[0];

  const total = tasks.length;
  const completed = tasks.filter(task => task.status === "done").length;
  const inProgress = tasks.filter(task => task.status !== "done").length;
  const overdue = tasks.filter(task => task.dueDate < today && task.status !== "done").length;

  const todayTasks = tasks.filter(task => task.dueDate === today);
  const upcoming = tasks.filter(task => {
    const due = new Date(task.dueDate);
    const now = new Date();
    const diff = (due - now) / (1000 * 60 * 60 * 24);
    return diff > 0 && diff <= 7;
  });

  return res.status(200).json(
    new ApiResponse(200, {
      total,
      completed,
      inProgress,
      overdue,
      todayTasks,
      upcoming
    }, "Dashboard data fetched successfully")
  );
});

export { createTask, getUserTasks, toggleTaskStatus, deleteTask, getDashboardStats };
