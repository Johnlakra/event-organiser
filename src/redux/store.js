import { configureStore } from "@reduxjs/toolkit";
import leaderBoardSlice from "./leaderBoard/leaderBoardSlice";
import dropdownSlice from "./dropdown/dropdownSlice";

export default configureStore({
  reducer: {
    leaderBoardSlice,
    dropdownSlice,
    liveonstageSlice
  },
});
