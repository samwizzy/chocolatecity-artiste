import { configureStore } from "@reduxjs/toolkit";
import artistSlice from "./reducers/artistSlice";
import tweetSlice from "./reducers/tweetSlice";
import albumSlice from "./reducers/albumSlice";

import appSlice from "./reducers/@app";

const store = configureStore({
  reducer: {
    app: appSlice,
    artist: artistSlice,
    tweet: tweetSlice,
    album: albumSlice,
  },
});

export default store;
