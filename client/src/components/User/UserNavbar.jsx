import React, { useState } from "react";
import {
    LayoutDashboard,
    CalendarCheck,
    MessageCircle,
    Settings,
    LogOut,
    Menu,
    X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../../assets";
import api from "../../utils/UserAxios";

const navigate = useNavigate();

const handleLogOut = async () => {
    await api.get("/logout");
    navigate("/");
};

const Dashboard = ({ userInfo }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-30 flex h-full w-64 transform flex-col justify-between bg-white px-4 py-6 shadow-md transition-transform duration-300 md:static ${
                    isSidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full md:translate-x-0"
                }`}
            >
                <div>
                    <div className="mb-8 flex items-center gap-2">
                        <img src={Logo} className="w-8 text-blue-600" />
                        <span className="text-xl font-semibold text-gray-800">
                            PingMe
                        </span>
                    </div>

                    <div className="flex flex-col gap-4 text-gray-700">
                        <Link
                            to="/dashboard"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-blue-50 hover:text-blue-600"
                        >
                            <LayoutDashboard className="h-5 w-5" />
                            Dashboard
                        </Link>
                        <Link
                            to="/calendar"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-blue-50 hover:text-blue-600"
                        >
                            <CalendarCheck className="h-5 w-5" />
                            Calendar
                        </Link>
                        <Link
                            to="/messages"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-blue-50 hover:text-blue-600"
                        >
                            <MessageCircle className="h-5 w-5" />
                            Messages
                        </Link>
                        <Link
                            to="/settings"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-blue-50 hover:text-blue-600"
                        >
                            <Settings className="h-5 w-5" />
                            Settings
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-3 border-t px-3 py-2 pt-4 text-gray-600">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-300 text-sm font-bold text-white">
                        <img src={userInfo?.avatar} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">
                            {userInfo?.name}
                        </span>
                        <span className="text-xs text-gray-500">
                            {userInfo?.email}
                        </span>
                    </div>
                    <button
                        className="ml-auto text-red-500 hover:text-red-600"
                        onClick={handleLogOut}
                    >
                        <LogOut className="h-5 w-5 cursor-pointer" />
                    </button>
                </div>
            </aside>

            {/* Overlay on mobile */}
            {isSidebarOpen && (
                <div
                    className="bg-opacity-30 fixed inset-0 z-20 bg-black md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Main Content */}
            <main className="w-full flex-1 overflow-y-auto p-6 md:ml-64">
                {/* Mobile top bar */}
                <div className="mb-4 flex items-center justify-between md:hidden">
                    <h1 className="text-xl font-semibold text-gray-800">
                        Welcome, {userInfo?.name || "User"}!
                    </h1>
                    <button
                        className="text-gray-600 hover:text-gray-800"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        {isSidebarOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>

                {/* Grid Content */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-xl bg-white p-4 shadow">
                        Stats or Cards
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow">
                        Recent Activity
                    </div>
                    <div className="rounded-xl bg-white p-4 shadow">
                        Quick Actions
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
