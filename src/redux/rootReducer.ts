import { combineReducers } from "@reduxjs/toolkit";
import userSortedFieldSlide from "./slides/userSortedField";
import showDrawerSlide from "./slides/showDrawer";

export const rootReducer = combineReducers({
  showDrawer: showDrawerSlide,
  userSortedField: userSortedFieldSlide,
});
