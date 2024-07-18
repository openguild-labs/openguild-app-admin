import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TRootState } from "..";
import { intentTypes } from "@/constants/twitter";

const params = {
  type: intentTypes.tweet,
  text: "",
  hashtags: [] as string[],
  tweetID: "",
  userID: "",
  screenName: "",
};

const initialState = {
  type: intentTypes.tweet,
  params,
};

export type TIntentState = typeof initialState;

const intentLinkParams = createSlice({
  name: "intentLinkParams",
  initialState,
  reducers: {
    setParamsValue: (state, action: PayloadAction<Partial<typeof params>>) => {
      return {
        type: state.type,
        params: {
          ...state.params,
          ...action.payload,
        },
      };
    },
    setType: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        type: action.payload,
        params,
      };
    },
    resetIntentLinkState: () => initialState,
  },
});

export const intentLinkParamsStore = (state: TRootState) => state.intentLinkParams;
export const { setParamsValue, setType, resetIntentLinkState } = intentLinkParams.actions;
export default intentLinkParams.reducer;
