import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../features/TaskSlice.js";

const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

export default store;