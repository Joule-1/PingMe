import React, { useState, useEffect } from "react";
import UserNavbar from "./UserNavbar";
import { Check, Clock, Menu, NotepadText, Trash, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchTasks,
    removeTask,
    toggleTask,
    createTask,
} from "../../features/TaskSlice.js";
import { formatDistanceToNow } from "date-fns";

const UserTask = () => {
    const dispatch = useDispatch();
    const taskState = useSelector((state) => state.tasks);

    const tasks = Array.isArray(taskState.tasks) ? taskState.tasks : [];

    const [priorityFilter, setPriorityFilter] = useState("all");
    const filteredTasks = tasks.filter((task) => {
        if (!task) return false;
        if (priorityFilter === "all") return true;
        if (priorityFilter === "completed") return task.status === "done";
        return task.priority?.toLowerCase() === priorityFilter;
    });

    const loading = taskState.loading;
    const error = taskState.error;

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "low",
        dueDate: "",
    });

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        (task) => task?.status === "done"
    ).length;

    const overdueTasks = tasks.filter((task) => {
        if (!task || !task.dueDate) return false;
        const today = new Date().toISOString().split("T")[0];
        return task.dueDate < today && task.status === "pending";
    }).length;

    const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const recentActivity = [...tasks]
        .filter((task) => task && task.updatedAt)
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, 5)
        .map((task) => {
            const type =
                task.createdAt === task.updatedAt
                    ? "created"
                    : task.status === "done"
                      ? "completed"
                      : "updated";
            return {
                id: task._id,
                title: task.title,
                type,
                time: formatDistanceToNow(new Date(task.updatedAt), {
                    addSuffix: true,
                }),
            };
        });

    const handlePriorityChange = (e) => {
        const value = e.target.value.trim().toLowerCase();
        if (["low", "medium", "high"].includes(value)) {
            setFormData((prev) => ({ ...prev, priority: value }));
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100">
            <UserNavbar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />
            <div className="ml-0 flex flex-1 flex-col overflow-hidden">
                {/* Mobile Menu Button */}
                <div className="p-4 md:hidden">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="text-gray-700 hover:text-gray-900"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </div>

                {/* Main Content */}
                <div className="w-full flex-1 overflow-y-auto p-6">
                    <section id="tasks" className="px-4 py-5 sm:px-6 lg:px-8">
                        <div className="max-w-7xl">
                            <div className="mb-5">
                                <h2 className="text-3xl font-bold text-gray-900">
                                    Tasks
                                </h2>
                                <p className="mt-2 max-w-2xl text-gray-600">
                                    Manage your tasks efficiently with priority
                                    levels, deadlines, and real-time
                                    collaboration features.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                                <div className="lg:col-span-2">
                                    <div className="mb-6">
                                        <button
                                            onClick={() => setShowModal(true)}
                                            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-blue-700"
                                        >
                                            Add New Task
                                        </button>
                                    </div>

                                    {/* Priority & Completed Filter Buttons */}
                                    <div className="mb-6 flex flex-wrap gap-2">
                                        {[
                                            "all",
                                            "low",
                                            "medium",
                                            "high",
                                            "completed",
                                        ].map((level) => (
                                            <button
                                                key={level}
                                                className={`filter-btn rounded-lg px-4 py-2 ${
                                                    priorityFilter === level
                                                        ? "bg-gray-300"
                                                        : "bg-gray-200"
                                                }`}
                                                onClick={() =>
                                                    setPriorityFilter(level)
                                                }
                                            >
                                                {level === "all"
                                                    ? "All Tasks"
                                                    : level === "completed"
                                                      ? "Completed"
                                                      : `${level.charAt(0).toUpperCase() + level.slice(1)} Priority`}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="space-y-4" id="taskList">
                                        {loading && (
                                            <p className="text-blue-500">
                                                Loading tasks...
                                            </p>
                                        )}
                                        {error && (
                                            <p className="text-red-500">
                                                {error}
                                            </p>
                                        )}
                                        {!loading && tasks.length === 0 && (
                                            <p className="text-gray-500">
                                                No tasks available.
                                            </p>
                                        )}
                                        {!loading &&
                                            filteredTasks.map((task) => (
                                                <div
                                                    key={task._id}
                                                    className={`task-item rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md ${
                                                        task.status === "done"
                                                            ? "opacity-70"
                                                            : ""
                                                    }`}
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex flex-1 items-start gap-4">
                                                            <input
                                                                type="checkbox"
                                                                checked={
                                                                    task.status ===
                                                                    "done"
                                                                }
                                                                onChange={() =>
                                                                    dispatch(
                                                                        toggleTask(
                                                                            task._id
                                                                        )
                                                                    )
                                                                }
                                                                className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                            />
                                                            <div className="flex-1">
                                                                <h3
                                                                    className={`mb-2 text-lg font-semibold ${
                                                                        task.status ===
                                                                        "done"
                                                                            ? "text-gray-500 line-through"
                                                                            : "text-gray-900"
                                                                    }`}
                                                                >
                                                                    {task.title}
                                                                </h3>
                                                                <p
                                                                    className={`mb-3 ${
                                                                        task.status ===
                                                                        "done"
                                                                            ? "text-gray-400 line-through"
                                                                            : "text-gray-600"
                                                                    }`}
                                                                >
                                                                    {
                                                                        task.description
                                                                    }
                                                                </p>
                                                                <div className="flex items-center gap-4 text-sm">
                                                                    <span
                                                                        className={`rounded-full px-3 py-1 font-medium ${
                                                                            task.priority
                                                                                ?.trim()
                                                                                .toLowerCase() ===
                                                                            "high"
                                                                                ? "bg-red-100 text-red-500"
                                                                                : task.priority
                                                                                        ?.trim()
                                                                                        .toLowerCase() ===
                                                                                    "medium"
                                                                                  ? "bg-yellow-100 text-yellow-500"
                                                                                  : "bg-green-100 text-green-500"
                                                                        }`}
                                                                    >
                                                                        {task.priority
                                                                            ? task.priority
                                                                                  .charAt(
                                                                                      0
                                                                                  )
                                                                                  .toUpperCase() +
                                                                              task.priority.slice(
                                                                                  1
                                                                              )
                                                                            : "Unknown"}{" "}
                                                                        Priority
                                                                    </span>
                                                                    <span className="text-gray-500">
                                                                        Due:{" "}
                                                                        {task.dueDate.split("T")[0] ||
                                                                            "N/A"}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <button className="text-gray-400 transition-colors duration-200 hover:text-blue-600">
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    dispatch(
                                                                        removeTask(
                                                                            task._id
                                                                        )
                                                                    )
                                                                }
                                                                className="text-gray-400 transition-colors duration-200 hover:text-red-600"
                                                            >
                                                                <div className="rounded-full bg-gray-100 p-2">
                                                                    <Trash
                                                                        size={
                                                                            15
                                                                        }
                                                                        className="cursor-pointer text-gray-500 hover:text-gray-800"
                                                                    />
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>

                                {/* Task Overview Sidebar */}
                                <div className="lg:col-span-1">
                                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                                        <h3 className="mb-6 text-lg font-semibold text-gray-900">
                                            Task Overview
                                        </h3>

                                        <div className="mb-6 space-y-4">
                                            <div className="rounded-lg bg-blue-50 p-4">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-sm font-medium text-blue-600">
                                                            Total Tasks
                                                        </p>
                                                        <p className="text-2xl font-bold text-blue-900">
                                                            {totalTasks}
                                                        </p>
                                                    </div>
                                                    <div className="rounded-full bg-blue-100 p-2">
                                                        <NotepadText className="text-blue-500" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="rounded-lg bg-green-50 p-4">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-sm font-medium text-green-600">
                                                            Completed
                                                        </p>
                                                        <p className="text-2xl font-bold text-green-900">
                                                            {completedTasks}
                                                        </p>
                                                    </div>
                                                    <div className="rounded-full bg-green-100 p-2">
                                                        <Check className="text-green-500" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="rounded-lg bg-red-50 p-4">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-sm font-medium text-red-600">
                                                            Overdue
                                                        </p>
                                                        <p className="text-2xl font-bold text-red-900">
                                                            {overdueTasks}
                                                        </p>
                                                    </div>
                                                    <div className="rounded-full bg-red-100 p-2">
                                                        <Clock className="text-red-500" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-6">
                                            <div className="mb-2 flex items-center justify-between">
                                                <span className="text-sm font-medium text-gray-700">
                                                    Progress
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    {progress}%
                                                </span>
                                            </div>
                                            <div className="h-2 w-full rounded-full bg-gray-200">
                                                <div
                                                    className="h-2 rounded-full bg-blue-600"
                                                    style={{
                                                        width: `${progress}%`,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="mb-3 text-sm font-semibold text-gray-900">
                                                Recent Activity
                                            </h4>
                                            <div className="space-y-3">
                                                {recentActivity.length === 0 ? (
                                                    <p className="text-sm text-gray-500">
                                                        No recent activity
                                                    </p>
                                                ) : (
                                                    recentActivity.map(
                                                        (activity) => (
                                                            <div
                                                                key={
                                                                    activity.id
                                                                }
                                                                className="flex items-center gap-3"
                                                            >
                                                                <div
                                                                    className={`rounded-full p-1 ${
                                                                        activity.type ===
                                                                        "created"
                                                                            ? "bg-blue-500"
                                                                            : activity.type ===
                                                                                "completed"
                                                                              ? "bg-green-500"
                                                                              : "bg-yellow-500"
                                                                    }`}
                                                                ></div>
                                                                <div className="flex-1">
                                                                    <p className="text-sm text-gray-900">
                                                                        {activity.type ===
                                                                            "created" &&
                                                                            "Task created"}{" "}
                                                                        {activity.type ===
                                                                            "completed" &&
                                                                            "Marked completed"}{" "}
                                                                        {activity.type ===
                                                                            "updated" &&
                                                                            "Task updated"}
                                                                        :{" "}
                                                                        <span className="font-medium">
                                                                            {
                                                                                activity.title
                                                                            }
                                                                        </span>
                                                                    </p>
                                                                    <p className="text-xs text-gray-500">
                                                                        {
                                                                            activity.time
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* Add Task Modal */}
            {showModal && (
                <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Add New Task
                            </h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X />
                            </button>
                        </div>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const {
                                    title,
                                    description,
                                    priority,
                                    dueDate,
                                } = formData;
                                const today = new Date()
                                    .toISOString()
                                    .split("T")[0];

                                if (
                                    !title.trim() ||
                                    !description.trim() ||
                                    !priority ||
                                    !dueDate
                                ) {
                                    alert("Please fill in all fields.");
                                    return;
                                }
                                if (dueDate < today) {
                                    alert("Due date cannot be in the past.");
                                    return;
                                }
                                dispatch(createTask(formData));
                                setShowModal(false);
                                setFormData({
                                    title: "",
                                    description: "",
                                    priority: "low",
                                    dueDate: "",
                                });
                            }}
                        >
                            <div className="space-y-4">
                                {/* Form fields (Title, Description, etc.) */}
                                <div>
                                    <label
                                        htmlFor="taskTitle"
                                        className="mb-1 block text-sm font-medium text-gray-700"
                                    >
                                        Task Title
                                    </label>
                                    <input
                                        type="text"
                                        id="taskTitle"
                                        name="title"
                                        value={formData.title}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                title: e.target.value,
                                            }))
                                        }
                                        required
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="taskDescription"
                                        className="mb-1 block text-sm font-medium text-gray-700"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        id="taskDescription"
                                        name="description"
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                description: e.target.value,
                                            }))
                                        }
                                        rows="3"
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    ></textarea>
                                </div>

                                <div>
                                    <label
                                        htmlFor="taskPriority"
                                        className="mb-1 block text-sm font-medium text-gray-700"
                                    >
                                        Priority
                                    </label>
                                    <select
                                        id="taskPriority"
                                        name="priority"
                                        value={formData.priority}
                                        onChange={handlePriorityChange}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="low">
                                            Low Priority
                                        </option>
                                        <option value="medium">
                                            Medium Priority
                                        </option>
                                        <option value="high">
                                            High Priority
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label
                                        htmlFor="taskDueDate"
                                        className="mb-1 block text-sm font-medium text-gray-700"
                                    >
                                        Due Date
                                    </label>
                                    <input
                                        type="date"
                                        id="taskDueDate"
                                        name="dueDate"
                                        value={formData.dueDate}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                dueDate: e.target.value,
                                            }))
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 transition-colors duration-200 hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`rounded-lg px-4 py-2 transition-colors duration-200 ${
                                        loading
                                            ? "cursor-not-allowed bg-blue-300 text-white"
                                            : "bg-blue-600 text-white hover:bg-blue-700"
                                    }`}
                                >
                                    {loading ? "Adding..." : "Add Task"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserTask;
