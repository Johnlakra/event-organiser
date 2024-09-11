import { configureStore } from "@reduxjs/toolkit";
import leaderBoardSlice from "./leaderBoard/leaderBoardSlice";

export default configureStore({
  reducer: {
    leaderBoardSlice,
  },
});
