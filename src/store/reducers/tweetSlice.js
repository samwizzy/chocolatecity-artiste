import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { openSnackbar } from "@/store/reducers/@app/snackbarSlice";

export const addTweetAsync = createAsyncThunk(
  "tweets/create",
  async (data, thunkAPI) => {
    return await axios.post("comments", data).then((res) => {
      thunkAPI.dispatch(openSnackbar({ message: "Tweet saved successfully" }));
      return res.data;
    });
  }
);

export const getTweetsAsync = createAsyncThunk(
  "tweets/all",
  async (page, limit = 10) => {
    return await axios
      .get(`comments?_page=${page}&_limit=${limit}`)
      .then((res) => {
        return res.data;
      });
  }
);

export const updateTweetsAsync = createAsyncThunk(
  "tweets/update",
  async (data, thunkAPI) => {
    return await axios.put(`comments/${data.id}`, data).then((res) => {
      thunkAPI.dispatch(
        openSnackbar({ message: "Tweet updated successfully" })
      );
      return res.data;
    });
  }
);

const tweetSlice = createSlice({
  name: "tweets",
  initialState: {
    loading: false,
    isSubmitting: false,
    tweets: [],
    dialog: {
      open: false,
      data: null,
    },
  },
  reducers: {
    removeTweet: (state, action) => {
      state.tweets = state.tweets.filter((p) => p.id !== action.payload);
    },
    openDialog: (state, action) => {
      state.dialog.open = true;
      state.dialog.data = action.payload;
    },
    closeDialog: (state, action) => {
      state.dialog.open = false;
      state.dialog.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTweetsAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getTweetsAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.tweets = action.payload;
    });

    // add a new tweet
    builder.addCase(addTweetAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addTweetAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.tweets.unshift(action.payload);
    });

    // update a tweet
    builder.addCase(updateTweetsAsync.pending, (state, action) => {
      state.isSubmitting = true;
    });
    builder.addCase(updateTweetsAsync.fulfilled, (state, action) => {
      const rest = state.tweets.filter(
        (tweet) => tweet.id !== action.payload.id
      );
      state.isSubmitting = false;
      state.tweets = [action.payload, ...rest];
    });
  },
});

export const { removeTweet, openDialog, closeDialog } = tweetSlice.actions;

export const deleteTweetAsync = (id) => async (dispatch) => {
  await axios.delete(`comments/${id}`).then((res) => {
    dispatch(removeTweet(id));
  });
};

export default tweetSlice.reducer;
