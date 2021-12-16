import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getArtistesAsync = createAsyncThunk("artistes/all", async () => {
  return await axios.get("users").then((res) => {
    return res.data;
  });
});

const artisteSlice = createSlice({
  name: "artistes",
  initialState: {
    loading: false,
    artistes: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getArtistesAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getArtistesAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.artistes = action.payload;
    });
    builder.addCase(getArtistesAsync.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export default artisteSlice.reducer;
