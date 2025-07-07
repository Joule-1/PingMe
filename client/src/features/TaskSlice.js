// src/redux/taskSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createTask = createAsyncThunk("tasks/createTask", async (taskData, thunkAPI) => {
  try {
    const response = await axios.post("/api/tasks", taskData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (_, thunkAPI) => {
  try {
    const response = await axios.get("/api/tasks");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleStatus(state, action) {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.status = task.status === "done" ? "pending" : "done";
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch tasks.";
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      });
  },
});

export const { deleteTask, toggleStatus } = taskSlice.actions;
export default taskSlice.reducer;
