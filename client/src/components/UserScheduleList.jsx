import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    addSchedule,
    fetchSchedule,
} from "../features/ScheduleManipulationSlice";

const UserScheduleList = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSchedule());
    }, [dispatch]);

    const userSchedules = useSelector((state) => state.userSchedules);
    
    console.log(userSchedules)
    return (
        <section>
            <h2>User Schedules</h2>

            <ul>
                {/* {userSchedules.map((schedule) => (
                    <li key={schedule.id} className="border">
                        <strong>{schedule.title}</strong> - {schedule.date} {schedule.time}  
                        <br />
                        <em>Priority:</em> {schedule.priority}  
                        <br />
                        {schedule.description}
                    </li>
                ))} */}
            </ul>
        </section>
    );
};

export default UserScheduleList;
