import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { teamsSlice } from "teams/teams-slice";

const reducer = combineReducers({
  teams: teamsSlice.reducer,
});

const store = configureStore({ reducer: reducer });

export default store;
