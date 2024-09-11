import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../service/api";

export const getLeaderBoardItems = createAsyncThunk(
  "leaderBoard/getItems",
  async () => {
    const response = await api("GET", "leaderBoard");
    return response;
  }
);

export const leaderBoardSlice = createSlice({
  name: "leaderBoard",
  initialState: {
    data: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getLeaderBoardItems.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const leaderBoardState = (state) => state.leaderBoardSlice;

export default leaderBoardSlice.reducer;
