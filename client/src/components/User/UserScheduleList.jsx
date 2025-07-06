import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    addSchedule,
    fetchSchedule,
} from "../../features/ScheduleManipulationSlice";

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
    
                <div className="grid grid-cols-4">
                {userSchedules.map((schedule) => (
                        <div key={schedule.scheduleId} className="border">
                            <strong>{schedule.scheduleTitle}</strong> - 
                            <br />
                            <br />
                        </div>
                    ))}
                </div>
                    
                 
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
