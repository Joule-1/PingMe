import { createSlice, nanoid } from "@reduxjs/toolkit";
import api from "../utils/Axios.js";

const initialState = {
    userSchedules: [{id: 1, title: "Hello world", date: "44", time: "q2", priority: "Extreme", description: "skjdf"}],
};

const ScheduleManipulationSlice = createSlice({
    name: "userSchedule",
    initialState,
    reducers: {
        addSchedule : async (state, action) => {
            const userSchedule = {
                id: nanoid(),
                // userid: action.payload.userid,
                title: action.payload.title,
                date: action.payload.date,
                time: action.payload.time,
                priority: action.payload.priority,
                description: action.payload.description,
            }
            state.userSchedules.push(userSchedule)
            const res = await api.post("/add-user-schedule", userSchedule)
            console.log("HEY")
            console.log(res.data)
             
        },
    }
});

export const {addSchedule} = ScheduleManipulationSlice.actions;

export default ScheduleManipulationSlice.reducer;

