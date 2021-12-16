import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import artistSlice from "./reducers/artistSlice";
import tweetSlice from "./reducers/tweetSlice";
import albumSlice from "./reducers/albumSlice";

import appSlice from "./reducers/@app";

const store = configureStore({
  reducer: {
    app: appSlice,
    auth: authSlice,
    artist: artistSlice,
    tweet: tweetSlice,
    album: albumSlice,
  },
});

export default store;
