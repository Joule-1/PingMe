import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userSchedules: [{id: 1, text: "Hello world"}],
};

const ScheduleManipulationSlice = createSlice({
    name: "userSchedule",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const userSchedule = {
                id: nanoid(), 
                text: action.payload
            }
            state.userSchedules.push(userSchedule)
        },
    }
});

export const {addTodo} = ScheduleManipulationSlice.actions;

export default ScheduleManipulationSlice.reducer;

