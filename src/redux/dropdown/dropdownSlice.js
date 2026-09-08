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
    deanery: [],
    parish: [],
    stage: [],
    leader_board: [],
    year: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getDropdown.fulfilled, (state, action) => {
      const payload = action.payload ?? {};
      state.events = payload.events ?? [];
      state.places = payload.places ?? [];
      state.deanery = payload.deanery ?? [];
      state.parish = payload.parish ?? [];
      state.stage = payload.stage ?? [];
      state.leader_board = payload.leader_board ?? [];
      state.year = payload.year ?? [];
    });
  },
});

export const dropdownState = (state) => state.dropdownSlice;

export default dropdownSlice.reducer;
