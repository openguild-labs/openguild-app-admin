import { combineReducers } from "@reduxjs/toolkit";
import collapsedSiderSlide from "./slides/collapsedSider";

export const rootReducer = combineReducers({
  collapsedSider: collapsedSiderSlide,
});
