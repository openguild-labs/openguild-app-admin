import { combineReducers } from "@reduxjs/toolkit";
import userQuerySlide from "./slides/userQuery";
import layoutSlide from "./slides/layout";
import missionQuerySlide from "./slides/missionQuery";
import intentLinkParamsSlide from "./slides/intentLinkParams";
import missionCategoryQuerySlide from "./slides/missionCategoryQuery";

export const rootReducer = combineReducers({
  missionQuery: missionQuerySlide,
  userQuery: userQuerySlide,
  layout: layoutSlide,
  intentLinkParams: intentLinkParamsSlide,
  missionCategoryQuery: missionCategoryQuerySlide,
});
