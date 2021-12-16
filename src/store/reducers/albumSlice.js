import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAlbumsAsync = createAsyncThunk("albums/all", async (userId) => {
  return await axios.get(`albums?userId=${userId}`).then((res) => {
    return res.data;
  });
});

export const getAlbumPhotosAsync = createAsyncThunk(
  "albums/photos",
  async (albumId) => {
    return await axios.get(`albums/${albumId}/photos`).then((res) => {
      return res.data;
    });
  }
);

const albumSlice = createSlice({
  name: "albums",
  initialState: {
    loading: false,
    photoLoading: false,
    albums: [],
    photos: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAlbumsAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAlbumsAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.albums = action.payload;
    });
    builder.addCase(getAlbumsAsync.rejected, (state, action) => {
      state.loading = false;
    });
    // get album photos
    builder.addCase(getAlbumPhotosAsync.pending, (state, action) => {
      state.photoLoading = true;
    });
    builder.addCase(getAlbumPhotosAsync.fulfilled, (state, action) => {
      state.photoLoading = false;
      state.photos = action.payload;
    });
    builder.addCase(getAlbumPhotosAsync.rejected, (state, action) => {
      state.photoLoading = false;
    });
  },
});

export default albumSlice.reducer;
