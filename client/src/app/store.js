import { configureStore } from "@reduxjs/toolkit";
import ScheduleManipulationReducer from "../features/ScheduleManipulationSlice.js";

const store = configureStore({
    reducer: ScheduleManipulationReducer
})

export default store;