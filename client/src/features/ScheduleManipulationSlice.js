import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    userSchedules: [{id: 1, userid: "afsdgssgdsg2", title: "Hello world", date: "44", time: "q2", priority: "Extreme", description: "skjdf"}],
};

const ScheduleManipulationSlice = createSlice({
    name: "userSchedule",
    initialState,
    reducers: {
        addSchedule : (state, action) => {
            const userSchedule = {
                id: nanoid(),
                userid: action.payload.userid,
                title: action.payload.title,
                date: action.payload.date,
                time: action.payload.time,
                priority: action.payload.priority,
                description: action.payload.description,
            }
            state.userSchedules.push(userSchedule)
        },
    }
});

export const {addSchedule} = ScheduleManipulationSlice.actions;

export default ScheduleManipulationSlice.reducer;

