import { combineSlices } from "@reduxjs/toolkit";
import userQuerySlide from "./slides/userQuery";
import layoutSlide from "./slides/layout";
import missionQuerySlide from "./slides/missionQuery";
import intentLinkParamsSlide from "./slides/intentLinkParams";
import missionCategoryQuerySlide from "./slides/missionCategoryQuery";
import rewardQuerySlide from "./slides/rewardQuery";

export const rootReducer = combineSlices({
  missionQuery: missionQuerySlide,
  userQuery: userQuerySlide,
  layout: layoutSlide,
  intentLinkParams: intentLinkParamsSlide,
  missionCategoryQuery: missionCategoryQuerySlide,
  rewardQuery: rewardQuerySlide,
});
