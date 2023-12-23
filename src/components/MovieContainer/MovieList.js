import { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import useInfiniteScroll from "../../utils/useInfiniteScroll";
import axios from "axios";
import { API_KEY, BASE_URL } from "../../utils/apiURL";
import { useDispatch, useSelector } from "react-redux";
import { addMovie } from "../../utils/movieSlice";

export const MovieListShimmer = ({ cardsCount }) => {
  return (
    <div className="flex flex-column movie-list-box">
      <h2 className="movie-year fs-20 my-3">movieYear</h2>
      <div className="movie-data-list">
        {Array.from({ length: cardsCount }).map((el, i) => {
          return (
            <div key={i} className="movie movie-loading">
              <div className="movie-box"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MovieList = ({
  movieList,
  movieYear,
  lastMovieElementRef,
  firstMovieElementRef,
  limit,
  skip,
  yearWiseMovies,
  setYearWiseMovies,
}) => {
  const activeItem = JSON.parse(localStorage.getItem("activeGenre"));
  const [activeGenre, setActiveGenre] = useState(movieYear ?? activeItem?.name);

  return (
    <div className="flex flex-column movie-list-box">
      <h2 className="movie-year fs-20 my-3">{activeGenre}</h2>
      <div className="movie-data-list">
        {movieList?.map((movie, index) => {
          const uniqueKey = `${movie.id}-${index}`;
          if (movieList?.length === index + 1) {
            return (
              <div ref={lastMovieElementRef} key={uniqueKey} className="movie">
                <MovieCard info={movie} />
              </div>
            );
          } else if (index === 0) {
            return (
              <div ref={firstMovieElementRef} key={uniqueKey} className="movie">
                <MovieCard info={movie} />
              </div>
            );
          } else {
            return (
              <div key={uniqueKey} className="movie">
                <MovieCard info={movie} />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default MovieList;
