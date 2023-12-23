import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movieList",
  initialState: {
    movieData: {},
    filterData: {},
  },
  reducers: {
    addMovie: (state, action) => {
      state.movieData = action.payload;
    },
    clearMovie: (state) => {
      state.movieData = {};
    },
    clearFilteredMovie: (state) => {
      state.filterData = {};
    },
    filterMovie: (state, action) => {
      state.filterData = action.payload;
    },
  },
});

export const { addMovie, clearMovie, clearFilteredMovie, filterMovie } =
  movieSlice.actions;
export default movieSlice.reducer;
