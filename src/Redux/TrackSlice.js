import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getTrackingData = createAsyncThunk(
  "TrackShpment/getTrackingData",
  async (trackingNumber) => {
    try {
      const response = await axios.get(
        `https://tracking.bosta.co/shipments/track/${trackingNumber}`
      );
      return response.data;
    } catch (err) {
      return err.response.data.error;
    }
  }
);

let initialState = {
  tracking: false,
  trackedData: {},
  error: "",
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
        if (action.payload === "Invalid tracking number!") {
          state.error = action.payload;
        }

        state.trackedData = action.payload;
      })
      .addCase(getTrackingData.rejected, (state, action) => {
        state.tracking = false;
        state.error = "Something went wrong";
      });
  },
});

export const TrackingDateReducer = trackingSlice.reducer;
