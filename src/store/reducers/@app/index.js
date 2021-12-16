import { combineReducers } from "@reduxjs/toolkit";
import snackbarSlice from "./snackbarSlice";

export default combineReducers({
  snackbar: snackbarSlice,
});
