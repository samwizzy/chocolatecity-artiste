import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { openSnackbar } from "@/store/reducers/@app/snackbarSlice";

export const signUpAsync = createAsyncThunk(
  "auth/signup",
  async (data, thunkAPI) => {
    return await axios.post("auth/signup", data).then((res) => {
      thunkAPI.dispatch(openSnackbar({ message: "User saved successfully" }));
      return res.data;
    });
  }
);

export const signInAsync = createAsyncThunk(
  "auth/signin",
  async (data, thunkAPI) => {
    return await axios
      .post("auth/signin", data)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        if (!err.response) throw err;
        return thunkAPI.rejectWithValue(err.response.data);
      });
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signInAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(signInAsync.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(signInAsync.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    builder.addCase(signUpAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(signUpAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(signUpAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default authSlice.reducer;
