import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../service/api";

export const getDropdown = createAsyncThunk("dropdown/getItems", async () => {
  const response = await api("GET", "dropdown");
  return response;
});

export const dropdownSlice = createSlice({
  name: "dropdown",
  initialState: {
    events: [],
    places: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getDropdown.fulfilled, (state, action) => {
      state.events = action.payload.events;
      state.places = action.payload.places;
      state.denerary = action.payload.denerary;
      state.parish = action.payload.parish;
      state.stage = action.payload.stage;
    });
  },
});

export const dropdownState = (state) => state.dropdownSlice;

export default dropdownSlice.reducer;
