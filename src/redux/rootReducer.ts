import { combineReducers } from "@reduxjs/toolkit";
import userQuerySlide from "./slides/userQuery";
import layoutSlide from "./slides/layout";
import missionQuerySlide from "./slides/missionQuery";

export const rootReducer = combineReducers({
  missionQuery: missionQuerySlide,
  userQuery: userQuerySlide,
  layout: layoutSlide,
});
