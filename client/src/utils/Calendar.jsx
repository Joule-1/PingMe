// import React, { useEffect, useState, useReducer } from "react";
// import {
//     LeftArrowIcon,
//     RightArrowIcon,
//     CalendarIcon,
//     DownArrowIcon,
//     AddIcon,
//     RefreshIcon,
// } from "../assets";
// import getCurrentTime from "./GetCurrentTime.js";
// import AddUserSchedule from "../components/AddUserSchedule.jsx";

// const Calendar = ({userid}) => {
//     // console.log(userid)
//     const weekDay = {
//         Sunday: {
//             shortName: "Sun",
//             dayPosition: 0,
//         },
//         Monday: {
//             shortName: "Mon",
//             dayPosition: 1,
//         },
//         Tuesday: {
//             shortName: "Tue",
//             dayPosition: 2,
//         },
//         Wednesday: {
//             shortName: "Web",
//             dayPosition: 3,
//         },
//         Thursday: {
//             shortName: "Thu",
//             dayPosition: 4,
//         },
//         Friday: {
//             shortName: "Fri",
//             dayPosition: 5,
//         },
//         Saturday: {
//             shortName: "Sat",
//             dayPosition: 6,
//         },
//     };

//     const weekDayPosition = {
//         0: "Sun",
//         1: "Mon",
//         2: "Tue",
//         3: "Wed",
//         4: "Thu",
//         5: "Fri",
//         6: "Sat",
//     };

//     const months = {
//         1: {
//             name: "January",
//             days: 31,
//             monthPosition: 1,
//         },
//         2: {
//             name: "February",
//             days: 28,
//             monthPosition: 2,
//         }, // 29 in a leap year
//         3: {
//             name: "March",
//             days: 31,
//             monthPosition: 3,
//         },
//         4: {
//             name: "April",
//             days: 30,
//             monthPosition: 4,
//         },
//         5: {
//             name: "May",
//             days: 31,
//             monthPosition: 5,
//         },
//         6: {
//             name: "June",
//             days: 30,
//             monthPosition: 6,
//         },
//         7: {
//             name: "July",
//             days: 31,
//             monthPosition: 7,
//         },
//         8: {
//             name: "August",
//             days: 31,
//             monthPosition: 8,
//         },
//         9: {
//             name: "September",
//             days: 30,
//             monthPosition: 9,
//         },
//         10: {
//             name: "October",
//             days: 31,
//             monthPosition: 10,
//         },
//         11: {
//             name: "November",
//             days: 30,
//             monthPosition: 11,
//         },
//         12: {
//             name: "December",
//             days: 31,
//             monthPosition: 12,
//         },
//     };

//     const [currentDay, setCurrentDay] = useState("Date");
//     const [currentMonth, setCurrentMonth] = useState(12);
//     const [currentYear, setCurrentYear] = useState("Year");
//     const [currentDayOfWeek, setCurrentDayOfWeek] = useState("Monday");
//     const [loading, setLoading] = useState(true);
//     const [displayAddSchedule, setdisplayAddSchedule] = useState("hidden");

//     useEffect(() => {
//         const fetchTime = async () => {
//             const currentTime = await getCurrentTime();
//             setCurrentMonth(currentTime.month);
//             setCurrentYear(currentTime.year);
//             setCurrentDay(currentTime.day);
//             setCurrentDayOfWeek(weekDay[currentTime.dayOfWeek].shortName);
//             setLoading(false);
//         };

//         fetchTime();
//     }, []);

//     const incrementTime = () => {
//         setCurrentMonth((prev) => (prev === 12 ? 1 : prev + 1));
//         setCurrentYear((prev) => (currentMonth === 12 ? prev + 1 : prev));
//     };

//     const decrementTime = () => {
//         setCurrentMonth((prev) => (prev === 1 ? 12 : prev - 1));
//         setCurrentYear((prev) => (currentMonth === 1 ? prev - 1 : prev));
//     };

//     useEffect(() => {
//         const weekDayRef = new Date(
//             `${months[currentMonth].name} ${currentDay}, ${currentYear}`
//         ).getDay();
//         setCurrentDayOfWeek(weekDayPosition[weekDayRef]);
//     }, [currentMonth, currentYear, currentDay]);

//     const normalizeWeekDays = (currentDay, currentMonth, currentYear) => {
//         const weekDayRef = new Date(
//             `${months[currentMonth].name} ${currentDay}, ${currentYear}`
//         ).getDay();

//         return weekDayPosition[weekDayRef];
//     };

//     const normalizeMonthDays = (dateOfMonth) => {
//         const totaldaysofmonth = months[currentMonth].days;
//         if (dateOfMonth > totaldaysofmonth) dateOfMonth %= totaldaysofmonth;
//         if (dateOfMonth < 1) {
//             if (currentMonth == 1) {
//                 dateOfMonth = months[12].days;
//             }
//             dateOfMonth = months[currentMonth - 1].days;
//         }
//         return dateOfMonth;
//     };

//     if (loading) return <div>Loading...</div>;

//     return (
//         <section>
//             <div className={`${displayAddSchedule}`}>
//                 <AddUserSchedule setdisplayAddSchedule={setdisplayAddSchedule} userid={userid} />
//             </div>
//             <div className="h-[50vh]">
//                 <div>
//                     <div className="flex place-content-between items-center px-4">
//                         <div className="poppins-semibold text-xl">
//                             Manage Your Schedule
//                         </div>
//                         <div className="flex items-center">
//                             <span
//                                 className="mr-2 cursor-pointer rounded-full bg-gray-200 p-2"
//                                 onClick={decrementTime}
//                             >
//                                 <img src={LeftArrowIcon} />
//                             </span>
//                             <div className="poppins-medium flex cursor-pointer items-center rounded-full bg-gray-200 px-2 py-2">
//                                 <span className="mx-2">
//                                     <img src={CalendarIcon} />
//                                 </span>
//                                 <span>
//                                     {months[currentMonth].name} {currentYear}
//                                 </span>
//                                 <span className="mx-2">
//                                     <img src={DownArrowIcon} />
//                                 </span>
//                                 <span>
//                                     <img
//                                         src={RefreshIcon}
//                                         className="rounded-full bg-white"
//                                     />
//                                 </span>
//                             </div>
//                             <span
//                                 className="ml-2 cursor-pointer rounded-full bg-gray-200 p-2"
//                                 onClick={incrementTime}
//                             >
//                                 <img src={RightArrowIcon} />
//                             </span>
//                         </div>
//                     </div>
//                     <div className="poppins-semibold mt-3 grid grid-cols-11 px-4 text-center">
//                         <span
//                             className="flex items-center justify-center rounded-tl-2xl border-1 border-gray-200"
//                             onClick={() => setdisplayAddSchedule((displayAddSchedule==="hidden") ? "block" : "")}
//                         >
//                             <img
//                                 src={AddIcon}
//                                 className="cursor-pointer rounded-full bg-gray-200 p-1"
//                             />
//                         </span>
//                         <span className="col-span-2 flex h-12 items-center justify-center border-1 border-gray-200">
//                             {normalizeWeekDays(
//                                 currentDay - 1,
//                                 currentMonth,
//                                 currentYear
//                             )}
//                             &nbsp;
//                             {normalizeMonthDays(currentDay - 1)}
//                         </span>
//                         <span className="col-span-2 flex h-12 items-center justify-center border-1 border-b-2 border-gray-200 border-b-[#4b82ff] text-[#4b82ff]">
//                             {currentDayOfWeek} {currentDay}
//                         </span>
//                         <span className="col-span-2 flex h-12 items-center justify-center border-1 border-gray-200">
//                             {normalizeWeekDays(
//                                 currentDay + 1,
//                                 currentMonth,
//                                 currentYear
//                             )}
//                             &nbsp;
//                             {normalizeMonthDays(currentDay + 1)}
//                         </span>
//                         <span className="col-span-2 flex h-12 items-center justify-center border-1 border-gray-200">
//                             {normalizeWeekDays(
//                                 currentDay + 2,
//                                 currentMonth,
//                                 currentYear
//                             )}
//                             &nbsp;
//                             {normalizeMonthDays(currentDay + 2)}
//                         </span>
//                         <span className="col-span-2 flex h-12 items-center justify-center rounded-tr-2xl border-1 border-gray-200">
//                             {normalizeWeekDays(
//                                 currentDay + 3,
//                                 currentMonth,
//                                 currentYear
//                             )}
//                             &nbsp;
//                             {normalizeMonthDays(currentDay + 3)}
//                         </span>
//                         <span className="h-20 border border-gray-200"></span>
//                         <span className="col-span-2 h-20 border border-gray-200"></span>
//                         <span className="col-span-2 h-20 border border-gray-200"></span>
//                         <span className="col-span-2 h-20 border border-gray-200"></span>
//                         <span className="col-span-2 h-20 border border-gray-200"></span>
//                         <span className="col-span-2 h-20 border border-gray-200"></span>
//                         <span className="h-20 border border-gray-200"></span>
//                         <span className="col-span-2 h-20 border border-gray-200"></span>
//                         <span className="col-span-2 h-20 border border-gray-200"></span>
//                         <span className="col-span-2 h-20 border border-gray-200"></span>
//                         <span className="col-span-2 h-20 border border-gray-200"></span>
//                         <span className="col-span-2 h-20 border border-gray-200"></span>
//                         <span className="h-20 rounded-bl-2xl border border-gray-200"></span>
//                         <span className="col-span-2 h-20 border border-gray-200"></span>
//                         <span className="col-span-2 h-20 border border-gray-200"></span>
//                         <span className="col-span-2 h-20 border border-gray-200"></span>
//                         <span className="col-span-2 h-20 border border-gray-200"></span>
//                         <span className="col-span-2 h-20 rounded-br-2xl border border-gray-200"></span>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Calendar;
import React, { useState } from "react";
import dayjs from "dayjs";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const daysInMonth = currentDate.daysInMonth();
  const startDay = startOfMonth.day(); // 0 (Sun) to 6 (Sat)

  const today = dayjs();

  const goToPreviousMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const goToNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  // Empty cells before first day
  const blanks = Array.from({ length: startDay }, (_, i) => (
    <div key={`blank-${i}`} className="p-2 aspect-square" />
  ));

  // Day cells
  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const dayNumber = i + 1;
    const date = currentDate.date(dayNumber);
    const isToday = date.isSame(today, "day");

    return (
      <div
        key={dayNumber}
        className={`p-2 aspect-square flex items-center justify-center rounded-full ${
          isToday ? "bg-blue-800 text-white font-bold" : ""
        }`}
      >
        {dayNumber}
      </div>
    );
  });

  return (
    <div className="max-w-md mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousMonth}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          ←
        </button>
        <h2 className="text-xl font-semibold">
          {currentDate.format("MMMM YYYY")}
        </h2>
        <button
          onClick={goToNextMonth}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          →
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 text-sm font-medium text-center mb-2">
        {weekdays.map((day) => (
          <div key={day} className="text-gray-600">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {blanks}
        {days}
      </div>
    </div>
  );
};

export default Calendar;
