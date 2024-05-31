import { createSlice } from "@reduxjs/toolkit";
import { TRootState } from "..";

const showDrawer = createSlice({
  name: "showDrawer",
  initialState: {
    value: false,
  },
  reducers: {
    setShowed(state) {
      state.value = !state.value;
    },
    setClosed(state) {
      state.value = false;
    },
  },
});

export const showDrawerStore = (state: TRootState) => state.showDrawer;
export const { setShowed, setClosed } = showDrawer.actions;
export default showDrawer.reducer;
