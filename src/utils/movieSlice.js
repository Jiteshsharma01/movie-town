import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movieList",
  initialState: {
    movieData: {}
  },
  reducers: {
    addMovie: (state, action) => {
      state.movieData = action.payload;
    },
    clearMovie: (state) => {
      state.movieData = {};
    }
  },
});

export const { addMovie, clearMovie } = movieSlice.actions;
export default movieSlice.reducer;
