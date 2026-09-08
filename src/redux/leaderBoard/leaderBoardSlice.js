import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../service/api";

const LEADER_BOARD_ENDPOINT = "v2/leaderBoard";

const buildQuery = ({ yearId } = {}) =>
  yearId ? `?year_id=${encodeURIComponent(yearId)}` : "";

/**
 * v2 returns rows grouped by year name, e.g. { "2025": [...], "2026": [...] }.
 * Passing `yearId` narrows the response to a single edition.
 */
export const getLeaderBoardItems = createAsyncThunk(
  "leaderBoard/getItems",
  async (params = {}) => api("GET", `${LEADER_BOARD_ENDPOINT}${buildQuery(params)}`)
);

export const addBatchBoardItem = createAsyncThunk(
  "leaderBoard/addBatch",
  async (payload) => api("POST", `${LEADER_BOARD_ENDPOINT}/batch`, payload)
);

export const deleteBoardItem = createAsyncThunk(
  "leaderBoard/deleteItem",
  async (id) => api("DELETE", `${LEADER_BOARD_ENDPOINT}/${id}`)
);

export const leaderBoardSlice = createSlice({
  name: "leaderBoard",
  initialState: {
    data: {},
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeaderBoardItems.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getLeaderBoardItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload ?? {};
      })
      .addCase(getLeaderBoardItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message ?? "Failed to load the leaderboard";
      });
  },
});

export const leaderBoardState = (state) => state.leaderBoardSlice;

export default leaderBoardSlice.reducer;
