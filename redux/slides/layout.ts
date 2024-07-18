import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TRootState } from "..";
import { COLLAPSED_THRESHOLD } from "@/constants/dimensions";

const layout = createSlice({
  name: "layoutSlide",
  initialState: {
    isOpenedDrawer: false,
    isCollapsedSider: false,
  },
  reducers: {
    toggleDrawer(state) {
      state.isOpenedDrawer = !state.isOpenedDrawer;
    },
    closeDrawer(state) {
      state.isOpenedDrawer = false;
    },
    setCollapsedSider(state, action: PayloadAction<boolean>) {
      state.isCollapsedSider = action.payload;
    },
  },
});

export const layoutStore = (state: TRootState) => state.layout;
export const { toggleDrawer, closeDrawer, setCollapsedSider } = layout.actions;
export default layout.reducer;
