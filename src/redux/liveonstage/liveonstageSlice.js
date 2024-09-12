import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../service/api";

export const getLiveOnStageItems = createAsyncThunk(
  "liveonstage/getItems",
  async () => {
    const response = await api("GET", "liveonstage");
    return response;
  }
);

export const addBatchStage = createAsyncThunk(
  "liveonstage/addItem",
  async (payload) => {
    const response = await api("POST", "liveonstage/batch", payload);
    return response;
  }
);

export const liveonstageSlice = createSlice({
  name: "liveonstage",
  initialState: {
    data: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getLiveOnStageItems.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const liveonstageState = (state) => state.liveonstageSlice;

export default liveonstageSlice.reducer;
