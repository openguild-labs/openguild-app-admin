import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TRootState } from "..";

const initialState: TUserSortedField = {
  field: "id",
  isAsc: true,
};

const userSortedField = createSlice({
  name: "collapsedSider",
  initialState,
  reducers: {
    setField(state, action: PayloadAction<TUserSortedField>) {
      state.field = action.payload.field;
      state.isAsc = action.payload.isAsc;
    },
    resetField(state) {
      state.field = initialState.field;
      state.isAsc = initialState.isAsc;
    },
  },
});

export const userSortedFieldStore = (state: TRootState) => state.userSortedField;
export const { setField, resetField } = userSortedField.actions;
export default userSortedField.reducer;
