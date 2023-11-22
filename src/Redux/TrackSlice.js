import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getTrackingData = createAsyncThunk(
  "TrackShpment/getTrackingData",
  async (trackingNumber) => {
    try {
      const response = await axios.get(
        `https://tracking.bosta.co/shipments/track/${trackingNumber}`
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

let initialState = {
  tracking: false,
  trackedData: {},
  error: null,
};

const trackingSlice = createSlice({
  name: "TrackShpment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTrackingData.pending, (state) => {
        state.tracking = true;
        state.trackedData = {};
        state.error = null;
      })
      .addCase(getTrackingData.fulfilled, (state, action) => {
        state.tracking = false;
        if (action.payload) {
          state.trackedData = action.payload;
        }
      })
      .addCase(getTrackingData.rejected, (state, action) => {
        state.tracking = false;
        if (action.meta.requestStatus === "rejected") {
          state.error = action.error.message || "Something went wrong";
        }
      });
  },
});

export const TrackingDateReducer = trackingSlice.reducer;
