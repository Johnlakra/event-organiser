import { configureStore } from "@reduxjs/toolkit";
import leaderBoardSlice from "./leaderBoard/leaderBoardSlice";
import dropdownSlice from "./dropdown/dropdownSlice";
import liveonstageSlice from "./liveonstage/liveonstageSlice";

export default configureStore({
  reducer: {
    leaderBoardSlice,
    dropdownSlice,
    liveonstageSlice,
  },
});
