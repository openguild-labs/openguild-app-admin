import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TRootState } from "..";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/pagination";

const initialState: TMissionQuery = {
  searchingTitle: "",
  status: "",
  pagination: {
    limit: LIMIT_DEFAULT,
    page: PAGE_DEFAULT,
  },
};

const missionQuery = createSlice({
  name: "missionQuery",
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

export const missionQueryStore = (state: TRootState) => state.missionQuery;
export const { setPagination, resetPagination } = missionQuery.actions;
export default missionQuery.reducer;
