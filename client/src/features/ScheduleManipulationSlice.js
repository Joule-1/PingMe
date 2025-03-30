import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userSchedules: [{id: 1, text: "Hello world"}],
};

const ScheduleManipulationSlice = createSlice({
    name: "userSchedule",
    initialState,
    reducers: {
        addSchedule : (state, action) => {
            const userSchedule = {
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

