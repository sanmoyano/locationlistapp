import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Place from "../model/place";
import { extractErrorMessage } from "../utils";

const initialState = {
  places: [],
  isLoading: false,
};

export const savePlace = createAsyncThunk("place/savePlace", async (place, thunkAPI) => {
  try {
    const newPlace = new Place(Date.now(), place.title, place.image);
    return newPlace;
  } catch (error) {
    return thunkAPI.rejectWithValue(extractErrorMessage(error));
  }
});

const placeSlice = createSlice({
  name: "place",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(savePlace.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(savePlace.fulfilled, (state, action) => {
        state.isLoading = false;
        state.places.push(action.payload);
      })
      .addCase(savePlace.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default placeSlice.reducer;
