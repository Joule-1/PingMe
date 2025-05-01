import React, { useState } from "react";
import UserNavbar from "./UserNavbar";
import { AddIcon } from "../assets";
import AddUserSchedule from "./AddUserSchedule";
import UserScheduleList from "./UserScheduleList";

const UserSchedules = () => {
    const [isAddScheduleVisible, setIsAddScheduleVisible] = useState(false);
    return (
        <section className="h-screen bg-gray-200">
            <div className={`${isAddScheduleVisible ? 'block' : 'hidden'}`}>
                <AddUserSchedule setIsAddScheduleVisible={setIsAddScheduleVisible}/>
            </div>
            <UserNavbar />
            <div
                onClick={() => setIsAddScheduleVisible(true)}
                className="poppins-semibold mx-auto my-10 flex px-5 w-fit cursor-pointer items-center justify-center rounded-3xl border-4 border-[#4b82ff] bg-white text-2xl shadow-lg"
            >
                New Schedule&nbsp;&nbsp;
                <img
                    src={AddIcon}
                    className="m-2 w-8 rounded-full bg-gray-200"
                />
            </div>
            <div className="mx-5 grid grid-cols-10">
                <div className="poppins-semibold col-span-2">
                    <div className="rounded-lg border-3 py-1 text-center text-2xl">
                        Priority
                    </div>
                    <div>
                        <div className="mx-auto mt-3 py-1 text-center text-xl">
                            Extreme
                        </div>
                        <hr className="mx-auto my-3 w-[50%] rounded-full border-1 border-gray-500" />
                        <div className="mx-auto py-1 text-center text-xl">
                            Moderate
                        </div>
                        <hr className="mx-auto my-3 w-[50%] rounded-full border-1 border-gray-500" />
                        <div className="mx-auto py-1 text-center text-xl">
                            Low
                        </div>
                    </div>
                </div>
                <div className="col-span-8 border-l-3">schedules</div>
                <UserScheduleList />
            </div>
        </section>
    );
};

export default UserSchedules;
