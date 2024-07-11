import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TRootState } from "..";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/pagination";

const initialState: TRewardQuery = {
  pagination: {
    limit: LIMIT_DEFAULT,
    page: PAGE_DEFAULT,
  },
};

const rewardQuery = createSlice({
  name: "rewardQuery",
  initialState,
  reducers: {
    setPagination(state, action: PayloadAction<Partial<TPagination>>) {
      if (action.payload.limit === undefined || action.payload.page === undefined) {
        return;
      }
      state.pagination.limit = action.payload.limit;
      state.pagination.page = action.payload.page;
    },
    resetPagination(state) {
      state.pagination.limit = initialState.pagination.limit;
      state.pagination.page = initialState.pagination.page;
    },
  },
});

export const rewardQueryStore = (state: TRootState) => state.rewardQuery;
export const { setPagination, resetPagination } = rewardQuery.actions;
export default rewardQuery.reducer;
