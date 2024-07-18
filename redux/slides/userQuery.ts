import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TRootState } from "..";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/constants/pagination";

const initialState: TUserQuery = {
  field: "id",
  isAsc: true,
  pagination: {
    limit: LIMIT_DEFAULT,
    page: PAGE_DEFAULT,
  },
};

const userQuery = createSlice({
  name: "userQuery",
  initialState,
  reducers: {
    setField(state, action: PayloadAction<Partial<TUserQuery>>) {
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

export const userQueryStore = (state: TRootState) => state.userQuery;
export const { setField, resetField, setPagination, resetPagination } = userQuery.actions;
export default userQuery.reducer;
