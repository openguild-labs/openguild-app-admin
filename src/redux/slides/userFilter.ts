import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TRootState } from "..";

export const LIMIT_DEFAULT = 10;
export const PAGE_DEFAULT = 0;

const initialState: TUserFilter = {
  field: "id",
  isAsc: true,
  pagination: {
    limit: LIMIT_DEFAULT,
    page: PAGE_DEFAULT,
  },
};

const userFilter = createSlice({
  name: "userFilter",
  initialState,
  reducers: {
    setField(state, action: PayloadAction<Partial<TUserFilter>>) {
      if (action.payload.field === undefined || action.payload.isAsc === undefined) {
        return;
      }
      state.field = action.payload.field;
      state.isAsc = action.payload.isAsc;
    },
    resetField(state) {
      state.field = initialState.field;
      state.isAsc = initialState.isAsc;
    },
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

export const userFilterStore = (state: TRootState) => state.userFilter;
export const { setField, resetField, setPagination, resetPagination } = userFilter.actions;
export default userFilter.reducer;
