import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TRootState } from "..";
import { ReactNode } from "react";

export type TMissionFooter = {
  footer: ReactNode;
};

const initialState: TMissionFooter = {
  footer: null,
};

const missionFooter = createSlice({
  name: "missionFooter",
  initialState,
  reducers: {
    setFooter(state, action: PayloadAction<ReactNode>) {
      state.footer = action.payload;
    },
  },
});

export const missionFooterStore = (state: TRootState) => state.missionFooter as TMissionFooter;
export const { setFooter } = missionFooter.actions;
export default missionFooter.reducer;
