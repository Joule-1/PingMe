import React, { useState } from "react";
import UserNavbar from "./UserNavbar";
import { Menu } from "lucide-react";
import UserTask from "./UserTask";

const UserDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100">
            {/* Sidebar */}
            <UserNavbar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />

            {/* Main Content */}
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

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 w-full">
                    {/* Replace this with your actual dashboard section */}
                    <section
                        id="dashboard"
                        className="min-h-screen w-full bg-gray-50 p-6"
                    >
                        <div className="mb-8">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">
                                        Dashboard
                                    </h1>
                                    <p className="mt-2 text-gray-600">
                                        Welcome back! Here's what's happening
                                        with your tasks today.
                                    </p>
                                </div>
                                <div className="mt-4 flex items-center space-x-4 sm:mt-0">
                                    <button className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-blue-700">
                                        Add Task
                                    </button>
                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                        {/* <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg> */}
                                        <span>Last updated: 2 minutes ago</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                            <div className="rounded-lg border border-gray-200 bg-white p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                                            {/* <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg> */}
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">
                                            Total Tasks
                                        </p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            24
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg border border-gray-200 bg-white p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                                            {/* <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg> */}
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">
                                            Completed
                                        </p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            18
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg border border-gray-200 bg-white p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-100">
                                            {/* <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg> */}
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">
                                            In Progress
                                        </p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            4
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg border border-gray-200 bg-white p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100">
                                            {/* <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg> */}
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">
                                            Overdue
                                        </p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            2
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            <div className="rounded-lg border border-gray-200 bg-white p-6 lg:col-span-2">
                                <div className="mb-6 flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Task Progress
                                    </h3>
                                    <select className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                                        <option>Last 7 days</option>
                                        <option>Last 30 days</option>
                                        <option>Last 3 months</option>
                                    </select>
                                </div>
                                <div className="h-64">
                                    <canvas id="taskProgressChart"></canvas>
                                </div>
                            </div>

                            <div className="rounded-lg border border-gray-200 bg-white p-6">
                                Chat Application
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div className="rounded-lg border border-gray-200 bg-white p-6">
                                <div className="mb-6 flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Today's Tasks
                                    </h3>
                                    <span className="text-sm text-gray-500">
                                        6 tasks
                                    </span>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3 rounded-lg p-3 transition-colors duration-200 hover:bg-gray-50">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900">
                                                Review pull requests
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Development • High Priority
                                            </p>
                                        </div>
                                        <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                                            High
                                        </span>
                                    </div>

                                    <div className="flex items-center space-x-3 rounded-lg p-3 transition-colors duration-200 hover:bg-gray-50">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900">
                                                Update project documentation
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Documentation • Medium Priority
                                            </p>
                                        </div>
                                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                                            Medium
                                        </span>
                                    </div>

                                    <div className="flex items-center space-x-3 rounded-lg p-3 transition-colors duration-200 hover:bg-gray-50">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-500 line-through">
                                                Team standup meeting
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                Meeting • Completed
                                            </p>
                                        </div>
                                        <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                                            Done
                                        </span>
                                    </div>

                                    <div className="flex items-center space-x-3 rounded-lg p-3 transition-colors duration-200 hover:bg-gray-50">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900">
                                                Prepare client presentation
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Presentation • High Priority
                                            </p>
                                        </div>
                                        <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                                            High
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg border border-gray-200 bg-white p-6">
                                <div className="mb-6 flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Upcoming Deadlines
                                    </h3>
                                    <span className="text-sm text-gray-500">
                                        Next 7 days
                                    </span>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-4 rounded-lg border border-red-200 bg-red-50 p-3">
                                        <div className="flex-shrink-0">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                                                <span className="text-sm font-bold text-red-600">
                                                    15
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900">
                                                Project Alpha Launch
                                            </p>
                                            <p className="text-xs text-red-600">
                                                Due tomorrow
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                                        <div className="flex-shrink-0">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
                                                <span className="text-sm font-bold text-yellow-600">
                                                    18
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900">
                                                Client Feedback Review
                                            </p>
                                            <p className="text-xs text-yellow-600">
                                                Due in 3 days
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 rounded-lg border border-blue-200 bg-blue-50 p-3">
                                        <div className="flex-shrink-0">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                                                <span className="text-sm font-bold text-blue-600">
                                                    22
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900">
                                                Monthly Report
                                            </p>
                                            <p className="text-xs text-blue-600">
                                                Due in 7 days
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button className="fixed right-6 bottom-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all duration-200 hover:bg-blue-700 hover:shadow-xl">
                        </button>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
