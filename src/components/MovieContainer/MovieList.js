import { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import useInfiniteScroll from "../../utils/useInfiniteScroll";
import axios from "axios";
import { API_KEY, BASE_URL } from "../../utils/apiURL";

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
  const [hasReachedTop, setHasReachedTop] = useState(false);
  
  const fetchApi = (year) => {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&primary_release_year=${year}&page=1&vote_count.gte=100`;
    axios({
      method: "GET",
      url: url,
      params: { limit: limit, skip: skip },
    })
      .then((res) => {
        const movieData = {};
        if (!yearWiseMovies.hasOwnProperty(year)) {
          movieData[year] = [...res?.data?.results];
        }
        setYearWiseMovies((prevData) => {
          return { ...prevData, ...movieData };
        });
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });
  };

  const handleScroll = () => {
    const headerElement = firstMovieElementRef.current;

    if (headerElement && !hasReachedTop) {
      const rect = headerElement.getBoundingClientRect();
      if (rect.top <= 0 && rect.bottom > 0) {
        console.log(
          `Header with movie year ${movieYear} reached the top of the screen!`
        );
        fetchApi(movieYear-1);
        setHasReachedTop(true);
      }
    }
  };
  
  useEffect(() => {
    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [firstMovieElementRef, movieYear, hasReachedTop]);

  return (
    <div className="flex flex-column movie-list-box">
      <h2 className="movie-year fs-20 my-3">{movieYear}</h2>
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
