import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/Axios.js";

const initialState = {
    userSchedules: [
        {
            id: 1,
            title: "Hello world",
            date: "44",
            time: "q2",
            priority: "Extreme",
            description: "skjdf",
        },
    ],
    isloading: false,
    error: null,
};

export const addSchedule = createAsyncThunk(
    "addSchedule",
    async (scheduleData, { rejectWithValue }) => {
        try {
            // console.log(scheduleData)
            const response = await api.post("/add-user-schedule", scheduleData);
            // console.log(response.data)
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to add schedule"
            );
        }
    }
);

export const fetchSchedule = createAsyncThunk(
    "fetchSchedule",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/get-user-schedule");
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch schedule"
            );
        }
    }
);

const ScheduleManipulationSlice = createSlice({
    name: "userSchedule",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSchedule.pending, (state, _) => {
                state.isloading = true;
            })
            .addCase(fetchSchedule.fulfilled, (state, action) => {
                state.isloading = false;
                console.log(action.payload);
                state.userSchedules = action.payload;
            })
            .addCase(fetchSchedule.rejected, (state, action) => {
                state.isloading = false;
                state.error = action.payload;
            })
            
            .addCase(addSchedule.pending, (state, _) => {
                state.isloading = true;
            })
            .addCase(addSchedule.fulfilled, (state, action) => {
                state.isloading = false;
                console.log(action)
                state.userSchedules.push(action.payload);
            })
            .addCase(addSchedule.rejected, (state, action) => {
                state.isloading = false;
                state.error = action.payload;
            });
    },
});

// export const { addSchedule } = ScheduleManipulationSlice.actions;

export default ScheduleManipulationSlice.reducer;
