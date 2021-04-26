import userSlice from "../slices/userSlice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  user: userSlice.reducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;

export default rootReducer;
