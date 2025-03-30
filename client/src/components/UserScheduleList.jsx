import React from "react";
import { useSelector } from "react-redux";

const UserScheduleList = () => {
    const userSchedules = useSelector((state) => state.userSchedules);

    return (
        <section>
            <h2>User Schedules</h2>
            <ul>
                {userSchedules.map((schedule) => (
                    <li key={schedule.id} className="border">
                        <strong>{schedule.title}</strong> - {schedule.date} {schedule.time}  
                        <br />
                        <em>Priority:</em> {schedule.priority}  
                        <br />
                        {schedule.description}
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default UserScheduleList;
