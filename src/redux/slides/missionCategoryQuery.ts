import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TRootState } from "..";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/pagination";

const initialState: TMissionCategoryQuery = {
  pagination: {
    limit: LIMIT_DEFAULT,
    page: PAGE_DEFAULT,
  },
};

const missionCategoryQuery = createSlice({
  name: "missionCategoryQuery",
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

export const missionCategoryQueryStore = (state: TRootState) => state.missionCategoryQuery;
export const { setPagination, resetPagination } = missionCategoryQuery.actions;
export default missionCategoryQuery.reducer;
