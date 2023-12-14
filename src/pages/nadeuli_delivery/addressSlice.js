// src/features/address/addressSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const addressSlice = createSlice({
  name: "address",
  initialState: {
    departure: "",
    arrival: "",
  },
  reducers: {
    setDeparture: (state, action) => {
      state.departure = action.payload;
    },
    setArrival: (state, action) => {
      state.arrival = action.payload;
    },
  },
});

export const { setDeparture, setArrival } = addressSlice.actions;

export default addressSlice.reducer;
