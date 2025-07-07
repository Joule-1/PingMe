// src/redux/taskSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/UserTaskAxios.js";

// Async thunks
export const createTask = createAsyncThunk(
    "tasks/createTask",
    async (taskData, thunkAPI) => {
        try {
            const response = await api.post("/tasks", taskData);
            return response.data; // whole response with { data, statusCode, message, success }
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || "Error while creating task"
            );
        }
    }
);

export const fetchTasks = createAsyncThunk(
    "tasks/fetchTasks",
    async (_, thunkAPI) => {
        try {
            const response = await api.get("/tasks");
            return response.data; // same structure
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || "Error while fetching tasks"
            );
        }
    }
);

export const toggleTask = createAsyncThunk(
    "tasks/toggleTask",
    async (taskId, thunkAPI) => {
        try {
            const response = await api.patch(`/tasks/${taskId}/toggle`);
            return response.data.data; // returns updated task
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || "Error toggling task"
            );
        }
    }
);

export const removeTask = createAsyncThunk(
    "tasks/deleteTask",
    async (taskId, thunkAPI) => {
        try {
            await api.delete(`/tasks/${taskId}`);
            return taskId; // just return the ID for Redux to remove
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || "Error deleting task"
            );
        }
    }
);

// Slice
const taskSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload.data || [];
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload?.message || "Failed to fetch tasks.";
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload.data);
            })
            .addCase(toggleTask.fulfilled, (state, action) => {
                const updated = action.payload;
                const index = state.tasks.findIndex(
                    (task) => task._id === updated._id
                );
                if (index !== -1) {
                    state.tasks[index] = updated;
                }
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(
                    (task) => task._id !== action.payload
                );
            });
    },
});

 export default taskSlice.reducer;
