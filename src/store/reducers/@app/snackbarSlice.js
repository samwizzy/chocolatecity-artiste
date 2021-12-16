import { createSlice } from "@reduxjs/toolkit";

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: {
    data: { open: false, message: "" },
  },
  reducers: {
    openSnackbar: (state, action) => {
      state.data.open = true;
      state.data.message = action.payload.message;
    },
    closeSnackbar: (state, action) => {
      state.data.open = false;
      state.data.message = "";
    },
  },
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
