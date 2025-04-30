import React from "react";
import {
    Logo,
    HomeIcon,
    CalendarIcon,
    ScheduleIcon,
    ChatIcon,
    SettingsIcon,
    ThemeToggle_Light,
    ThemeToggle_Dark,
    UserAvatarDefaultIcon,
    SearchIcon,
} from "../assets";

const UserNavbar = () => {
    return (
        <section className="flex place-content-evenly items-center bg-gray-200 pt-3 text-sm">
            <div className="flex h-13 items-center rounded-full bg-white px-4">
                <div className={`w-10 hover:scale-105`}>
                    <img src={Logo} className="w-full" />
                </div>
                <span className="poppins-semibold ml-2 text-xl">PingMe</span>
            </div>
            <div className="flex h-13 w-[50%] place-content-evenly items-center rounded-full bg-white">
                <div className="flex cursor-pointer hover:text-[#4b82ff]">
                    <span className="my-auto">
                        <img
                            src={HomeIcon}
                            className="w-5 fill-current hover:text-[#4b82ff]"
                        />
                    </span>
                    &nbsp;
                    <span className="my-auto">Home</span>
                </div>
                <div className="flex cursor-pointer hover:text-[#4b82ff]">
                    <span className="my-auto">
                        <img
                            src={CalendarIcon}
                            className="w-5 fill-current hover:text-[#4b82ff]"
                        />
                    </span>
                    &nbsp;
                    <span className="my-auto">Calendar</span>
                </div>
                <div className="flex cursor-pointer hover:text-[#4b82ff]">
                    <span className="my-auto">
                        <img
                            src={ScheduleIcon}
                            className="w-5 fill-current hover:text-[#4b82ff]"
                        />
                    </span>
                    &nbsp;
                    <span className="my-auto">Schedules</span>
                </div>
                <div className="flex cursor-pointer hover:text-[#4b82ff]">
                    <span className="my-auto">
                        <img
                            src={ChatIcon}
                            className="w-5 fill-current hover:text-[#4b82ff]"
                        />
                    </span>
                    &nbsp;
                    <span className="my-auto">Messages</span>
                </div>
                <div className="flex cursor-pointer hover:text-[#4b82ff]">
                    {/* <span className="my-auto">
                        <img
                            src={SettingsIcon}
                            className="w-5 fill-current hover:text-[#4b82ff]"
                        />
                    </span>
                    &nbsp;
                    <span className="my-auto">Settings</span> */}
                </div>
            </div>
            <div className="flex h-13 w-[25%] place-content-evenly items-center rounded-full bg-white">
                <span className="flex h-10 w-[75%] items-center rounded-full bg-gray-200">
                    <label htmlFor="searchbox" className="px-3">
                        <img src={SearchIcon} className="w-5 cursor-pointer" />
                    </label>
                    <input
                        type="text"
                        id="searchbox"
                        placeholder="Search here..."
                    />
                </span>
                <span className="rounded-full bg-gray-200 px-2 py-1">
                    <img src={ThemeToggle_Light} className="w-5" />
                </span>
                <span>
                    <img src={UserAvatarDefaultIcon} className="w-8" />
                </span>
            </div>
        </section>
    );
};

export default UserNavbar;
