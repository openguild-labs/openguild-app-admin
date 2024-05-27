import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TRootState } from "..";

const collapsedSider = createSlice({
  name: "collapsedSider",
  initialState: {
    value: false,
  },
  reducers: {
    setCollapsed(state, action: PayloadAction<boolean>) {
      state.value = action.payload;
    },
  },
});

export const collapsedSiderStore = (state: TRootState) => state.collapsedSider;
export const { setCollapsed } = collapsedSider.actions;
export default collapsedSider.reducer;
