// import getCurrentTime from "./GetCurrentTime.js";
// import AddUserSchedule from "../components/AddUserSchedule.jsx";

import React, { useState } from "react";
import dayjs from "dayjs";
import {
    LeftArrowIcon,
    RightArrowIcon,
    CalendarIcon,
    DownArrowIcon,
    AddIcon,
    RefreshIcon,
} from "../assets";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(dayjs());

    const startOfMonth = currentDate.startOf("month");
    const endOfMonth = currentDate.endOf("month");
    const daysInMonth = currentDate.daysInMonth();
    const startDay = startOfMonth.day();

    const [isYearChangeVisible, setIsYearChangeVisible] = useState(false);
    const [newYear, setNewYear] = useState(currentDate.year());
    const today = dayjs();

    const goToPreviousMonth = () => {
        setCurrentDate(currentDate.subtract(1, "month"));
    };

    const goToNextMonth = () => {
        setCurrentDate(currentDate.add(1, "month"));
    };

    const handleMonthChange = (month) => {
        setCurrentDate(currentDate.set("month", month));
    };

    const handleYearChange = () => {
        setCurrentDate(currentDate.set("year", newYear)); // Set the new year
        setIsYearChangeVisible(false); // Hide the year input
    };

    const getPresentDate = () => {
        setCurrentDate(today);
    };

    const blanks = Array.from({ length: startDay }, (_, i) => (
        <div key={`blank-${i}`} className="aspect-square p-2" />
    ));

    const days = Array.from({ length: daysInMonth }, (_, i) => {
        const dayNumber = i + 1;
        const date = currentDate.date(dayNumber);
        const isToday = date.isSame(today, "day");

        return (
            <div
                key={dayNumber}
                className={`flex aspect-square items-center justify-center rounded-full p-2 ${
                    isToday ? "bg-blue-800 font-bold text-white" : ""
                }`}
            >
                {dayNumber}
            </div>
        );
    });

    return (
        <div>
            <div className="mb-4 flex items-center justify-between">
                <button
                    onClick={goToPreviousMonth}
                    className="cursor-pointer rounded bg-gray-200 px-3 py-1 hover:bg-gray-300"
                >
                    <img src={LeftArrowIcon} />
                </button>
                <div className="poppins-semibold flex items-center text-xl">
                    <div className="group relative">
                        {currentDate.format("MMMM")}
                        <div className="poppins-regular absolute top-6 -left-8 flex hidden w-45 flex-wrap rounded-xl bg-gray-100 text-sm group-hover:flex">
                            {[
                                "Jan",
                                "Feb",
                                "Mar",
                                "Apr",
                                "May",
                                "Jun",
                                "Jul",
                                "Aug",
                                "Sep",
                                "Oct",
                                "Nov",
                                "Dec",
                            ].map((month, index) => (
                                <span
                                    key={index}
                                    className="m-2 cursor-pointer"
                                    onClick={() => handleMonthChange(index)}
                                >
                                    {month}
                                </span>
                            ))}
                        </div>
                    </div>
                    &nbsp;
                    <div>
                        {isYearChangeVisible ? (
                            <div className="flex rounded-xl bg-gray-200 p-1">
                                <input
                                    type="text"
                                    maxlength={4}
                                    minlength={4}
                                    className="w-13 rounded-xl bg-gray-200 mx-1"
                                    value={newYear}
                                    autoFocus
                                    onFocus={(e) => e.target.select()}
                                    onChange={(e) => {
                                        const newYearValue = e.target.value;
                                        if (/^\d{0,4}$/.test(newYearValue)) {
                                            setNewYear(newYearValue);
                                        }
                                    }}
                                />
                                <button
                                    onClick={handleYearChange}
                                    className="ml-1 cursor-pointer rounded bg-white px-1 text-green-600"
                                >
                                    ✓
                                </button>
                            </div>
                        ) : (
                            <input
                                type="text"
                                readOnly
                                maxlength={4}
                                minlength={4}
                                value={currentDate.format("YYYY")}
                                onClick={() => setIsYearChangeVisible(true)}
                                className="w-13 cursor-pointer"
                            />
                        )}
                    </div>
                </div>
                <div className="flex">
                    <img
                        src={RefreshIcon}
                        onClick={getPresentDate}
                        className="mx-2 cursor-pointer"
                    />
                    <button
                        onClick={goToNextMonth}
                        className="cursor-pointer rounded bg-gray-200 px-3 py-1 hover:bg-gray-300"
                    >
                        <img src={RightArrowIcon} />
                    </button>
                </div>
            </div>

            <div className="mb-2 grid grid-cols-7 text-center text-sm font-medium">
                {weekdays.map((day) => (
                    <div key={day} className="text-gray-600">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {blanks}
                {days}
            </div>
        </div>
    );
};

export default Calendar;
