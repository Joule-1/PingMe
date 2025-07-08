import React, { useEffect, useState } from "react";
import api from "../../utils/UserDashboardAxios.js";
import UserNavbar from "./UserNavbar";
import { Check, Clock, Menu, NotepadText, TriangleAlert } from "lucide-react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CalendarDashboard from "../../utils/CalendarDashboard.jsx";
import { useDispatch } from "react-redux";
import { toggleTask } from "../../features/TaskSlice.js";

const UserDashboard = () => {
    const dispatch = useDispatch();

    const [stats, setStats] = useState({
        total: 0,
        completed: 0,
        inProgress: 0,
        overdue: 0,
        todayTasks: [],
        upcoming: [],
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Fetch stats on mount
    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await api.get("/dashboard");
                setStats(res.data.data);
                console.log(res.data.data)
            } catch (err) {
                console.error("Failed to load dashboard stats:", err);
            }
        }
        fetchStats();
    }, []);

    // Prepare a Set of due-date strings for highlighting on the calendar
    const taskDates = new Set(
        [...(stats.todayTasks || []), ...(stats.upcoming || [])].map((task) =>
            new Date(task.dueDate).toDateString()
        )
    );
    const tileClassName = ({ date, view }) => {
        if (view === "month" && taskDates.has(date.toDateString())) {
            return "bg-blue-100 text-blue-800 font-medium rounded-full";
        }
        return null;
    };

    // Filter out any invalid tasks to avoid undefined errors
    const validTodayTasks = (stats.todayTasks || []).filter(
        (task) => task && typeof task === "object"
    );
    const validUpcomingTasks = (stats.upcoming || []).filter(
        (task) => task && typeof task === "object"
    );

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <UserNavbar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />

            {/* Main content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Mobile menu button */}
                <div className="p-4 md:hidden">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="text-gray-700 hover:text-gray-900"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </div>

                <div className="overflow-y-auto p-6">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="mt-2 text-gray-600">
                        Welcome back! Here's what's happening with your tasks
                        today.
                    </p>

                    {/* Stats cards */}
                    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <div className="flex items-center rounded-lg bg-white p-6">
                            <div className="mr-5 rounded-full bg-blue-100 p-2">
                                <NotepadText className="text-blue-500" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Total Tasks
                                </p>
                                <p className="text-2xl font-bold">
                                    {stats.total}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center rounded-lg bg-white p-6">
                            <div className="mr-5 rounded-full bg-green-100 p-2">
                                <Check className="text-green-500" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Completed
                                </p>
                                <p className="text-2xl font-bold">
                                    {stats.completed}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center rounded-lg bg-white p-6">
                            <div className="mr-5 rounded-full bg-yellow-100 p-2">
                                <Clock className="text-red-500" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    In Progress
                                </p>
                                <p className="text-2xl font-bold">
                                    {stats.inProgress}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center rounded-lg bg-white p-6">
                            <div className="mr-5 rounded-full bg-red-100 p-2">
                                <TriangleAlert className="text-red-500" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    Overdue
                                </p>
                                <p className="text-2xl font-bold">
                                    {stats.overdue}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Calendar and chat/placeholders */}
                    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* Calendar with highlighted task dates */}
                        <div className="col-span-2 rounded-lg bg-white p-6">
                            <CalendarDashboard
                                className="w-full"
                                tasks={[...stats.todayTasks, ...stats.upcoming]}
                            />
                        </div>
                        {/* Placeholder for chat or other widget */}
                        <div className="rounded-lg bg-white p-6">
                            Chat Application
                        </div>
                    </div>

                    {/* Today's Tasks list */}
                    <div className="my-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="rounded-lg bg-white p-6">
                            <div className="mb-4 flex justify-between">
                                <h3 className="text-lg font-semibold">
                                    Today's Tasks
                                </h3>
                                <span className="text-sm text-gray-500">
                                    {validTodayTasks.length} tasks
                                </span>
                            </div>
                            <div className="space-y-3">
                                {validTodayTasks.length === 0 ? (
                                    <p className="text-sm text-gray-500">
                                        No tasks for today.
                                    </p>
                                ) : (
                                    validTodayTasks.map((task) => (
                                        <div
                                            key={task._id}
                                            className="flex items-center space-x-3 rounded-lg p-3 hover:bg-gray-50"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={task.status === "done"}
                                                onChange={async () => {
                                                    try {
                                                        await dispatch(
                                                            toggleTask(task._id)
                                                        );

                                                        // Immediately reflect the change locally
                                                        setStats((prev) => {
                                                            const updatedToday =
                                                                prev.todayTasks.map(
                                                                    (t) =>
                                                                        t._id ===
                                                                        task._id
                                                                            ? {
                                                                                  ...t,
                                                                                  status:
                                                                                      t.status ===
                                                                                      "done"
                                                                                          ? "pending"
                                                                                          : "done",
                                                                              }
                                                                            : t
                                                                );
                                                            return {
                                                                ...prev,
                                                                todayTasks:
                                                                    updatedToday,
                                                            };
                                                        });
                                                    } catch (err) {
                                                        console.error(
                                                            "Failed to toggle task:",
                                                            err
                                                        );
                                                    }
                                                }}
                                                className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <div className="flex-1">
                                                <p
                                                    className={`text-sm font-medium ${
                                                        task.status === "done"
                                                            ? "text-gray-500 line-through"
                                                            : "text-gray-900"
                                                    }`}
                                                >
                                                    {task.title}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {task.description ||
                                                        "No description"}
                                                </p>
                                            </div>
                                            <span
                                                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                                    task.priority === "high"
                                                        ? "bg-red-100 text-red-800"
                                                        : task.priority ===
                                                            "medium"
                                                          ? "bg-yellow-100 text-yellow-800"
                                                          : "bg-green-100 text-green-800"
                                                }`}
                                            >
                                                {task.priority
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    task.priority.slice(1)}
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Upcoming Deadlines */}
                        <div className="rounded-lg bg-white p-6">
                            <div className="mb-4 flex justify-between">
                                <h3 className="text-lg font-semibold">
                                    Upcoming Deadlines
                                </h3>
                                <span className="text-sm text-gray-500">
                                    Next 7 days
                                </span>
                            </div>
                            <div className="space-y-4">
                                {validUpcomingTasks.length === 0 ? (
                                    <p className="text-sm text-gray-500">
                                        No upcoming deadlines.
                                    </p>
                                ) : (
                                    validUpcomingTasks.map((task) => (
                                        <div
                                            key={task._id}
                                            className="flex items-center space-x-4 rounded-lg border border-blue-200 bg-blue-50 p-3"
                                        >
                                            <div className="flex-shrink-0">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                                                    <span className="text-sm font-bold text-blue-600">
                                                        {new Date(
                                                            task.dueDate
                                                        ).getDate()}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {task.title}
                                                </p>
                                                <p className="text-xs text-blue-600">
                                                    Due:{" "}
                                                    {new Date(
                                                        task.dueDate
                                                    ).toLocaleDateString(
                                                        "en-IN"
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
