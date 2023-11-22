import { configureStore } from "@reduxjs/toolkit";
import { TrackingDateReducer } from "./TrackSlice";

const store = configureStore({
  reducer: {
    track: TrackingDateReducer,
  },
});

export default store;
