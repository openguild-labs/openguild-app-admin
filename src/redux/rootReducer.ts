import { combineReducers } from "@reduxjs/toolkit";
import userFilterSlide from "./slides/userFilter";
import layoutSlide from "./slides/layout";

export const rootReducer = combineReducers({
  userFilter: userFilterSlide,
  layout: layoutSlide,
});
