    import React, { useState } from "react";
    import dayjs from "dayjs";
    import { LeftArrowIcon, RightArrowIcon } from "../assets";

    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    export default function CalendarDashboard({ tasks = [], className = "" }) {
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [openMonth, setOpenMonth] = useState(false);
    const [editYear, setEditYear] = useState(false);
    const [yearInput, setYearInput] = useState(currentDate.year());

    const today = dayjs();

    // group tasks by date
    const taskMap = tasks.reduce((acc, t) => {
        const d = dayjs(t.dueDate).format("YYYY-MM-DD");
        (acc[d] = acc[d] || []).push(t);
        return acc;
    }, {});

    const start = currentDate.startOf("month");
    const totalDays = currentDate.daysInMonth();
    const offset = start.day();

    const nav = {
        prev: () => setCurrentDate(currentDate.subtract(1, "month")),
        next: () => setCurrentDate(currentDate.add(1, "month")),
        today: () => setCurrentDate(today),
    };

    const changeYear = () => {
        const y = parseInt(yearInput, 10);
        if (!isNaN(y)) setCurrentDate(currentDate.set("year", y));
        setEditYear(false);
    };

    const blanks = Array.from({ length: offset }, (_, i) => (
        <div key={i} className="py-2" />
    ));

    const days = Array.from({ length: totalDays }, (_, i) => {
        const num = i + 1;
        const day = currentDate.date(num);
        const key = day.format("YYYY-MM-DD");
        const isToday = day.isSame(today, "day");
        const has = taskMap[key];
        return (
        <div key={num} className={`relative flex items-center justify-center w-full py-3 rounded-full ${isToday?"bg-blue-800 text-white":""}`} title={has?has.map(t=>t.title).join(", "):""}>
            {num}
            {has && <span className="absolute bottom-1 w-2 h-2 rounded-full bg-orange-500" />}
        </div>
        );
    });

    return (
        <div className={`flex flex-col h-full w-full ${className}`}>
        {/* header */}
        <div className="flex items-center justify-between mb-4">
            <button onClick={nav.prev} className="p-2 bg-gray-200 rounded hover:bg-gray-300">
            <img src={LeftArrowIcon} alt="Prev" />
            </button>
            <div className="flex items-center space-x-2">
            <div className="relative">
                <button onClick={()=>setOpenMonth(!openMonth)}>
                {currentDate.format("MMMM")}
                </button>
                {openMonth && (
                <div className="absolute z-50 bg-white shadow rounded h-[100px] overflow-y-auto overflow-x-hidden">
                    {months.map((m,i)=>(
                    <div key={i} onClick={()=>{setOpenMonth(false); setCurrentDate(currentDate.set("month",i));}} className="p-1 px-2 hover:bg-gray-100">
                        {m}
                    </div>
                    ))}
                </div>
                )}
            </div>
            <div>
                {editYear ? (
                <div className="flex items-center space-x-1 bg-gray-200 rounded p-1">
                    <input value={yearInput} onChange={e=>setYearInput(e.target.value.replace(/\D/,'').slice(0,4))} className="w-14 bg-gray-200 outline-none" />
                    <button onClick={changeYear} className="text-green-600">✓</button>
                </div>
                ) : (
                <button onClick={()=>setEditYear(true)}>{currentDate.format("YYYY")}</button>
                )}
            </div>
            </div>
            <div className="flex items-center space-x-2">
            <button onClick={nav.today} className="p-2 bg-gray-200 rounded hover:bg-gray-300">Today</button>
            <button onClick={nav.next} className="p-2 bg-gray-200 rounded hover:bg-gray-300">
                <img src={RightArrowIcon} alt="Next" />
            </button>
            </div>
        </div>
        {/* weekdays */}
        <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-600">
            {weekdays.map(d=><div key={d}>{d}</div>)}
        </div>
        {/* days */}
        <div className="grid grid-cols-7 gap-1 flex-1">
            {blanks}{days}
        </div>
        </div>
    );
    }
