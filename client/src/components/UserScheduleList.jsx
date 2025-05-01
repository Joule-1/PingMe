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

    const userSchedules = useSelector((state) => state.userSchedule.userSchedules);
    console.log(userSchedules)
    // console.log(userSchedules)
    if(userSchedules){
        return (
            <section>
                <h2>User Schedules</h2>
    
                <ul>
                    {userSchedules.map((schedule) => (
                        <li key={schedule.scheduleId} className="border">
                            <strong>{schedule.scheduleTitle}</strong> - 
                            <br />
                            <br />
                        </li>
                    ))}
                </ul>
            </section>
        );
    }
    else{
        return(
            <section>
                No Schedule Found
            </section>
        )
    }
};

export default UserScheduleList;
