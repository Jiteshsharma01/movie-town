import React, { useCallback, useEffect, useRef, useState } from "react";
import "./MovieContainer.scss";
import "./MovieContainer.scss";
import useInfiniteScroll from "../../utils/useInfiniteScroll";
import MovieList, { MovieListShimmer } from "./MovieList";
import { useSelector } from "react-redux";
import FilterMovies from "./FilterMovies";

const MovieContainer = () => {
  const [movieYear, setMovieYear] = useState(2012);
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);

  const movies = useSelector((store) => store?.movieList?.movieData);
  const filterMovies = useSelector((store) => store?.movieList?.filterData);

  const { loading, error, hasMore, movieList, yearWiseData } =
    useInfiniteScroll(limit, skip, movieYear);

  const [yearWiseMovies, setYearWiseMovies] = useState(movies ?? {});
  const [filteredMovies, setFilteredMovies] = useState(filterMovies ?? []);

  useEffect(() => {
    let _data;
    if (Object.keys(movies).length) {
      _data = { ...movies };
      setYearWiseMovies(_data);
      setFilteredMovies([]);
    } else if (filterMovies.length) {
      _data = [...filterMovies];
      setFilteredMovies(_data);
      setYearWiseMovies({});
    } else {
      setYearWiseMovies({});
      setFilteredMovies([]);
    }
  }, [movies, filterMovies]);

  const firstMovieElementRef = useRef();
  const observer = useRef();
  const lastMovieElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer?.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setMovieYear((prevYear) => prevYear + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  if (filteredMovies?.length === 0 && Object.keys(yearWiseMovies)?.length === 0)
    return <h4 className="fs-16 my-3 ls-1 px-2">No movies found!!!</h4>;

  return (
    <div className="movie-container flex flex-column p-2">
      <>
        {yearWiseMovies &&
          Object.keys(yearWiseMovies)?.map((key) => {
            return (
              <MovieList
                key={key}
                movieList={yearWiseMovies[key]}
                movieYear={key}
                lastMovieElementRef={lastMovieElementRef}
                firstMovieElementRef={firstMovieElementRef}
              />
            );
          })}
      </>
      <>
        {filteredMovies?.length > 0 &&
          filteredMovies?.map((item, index) => {
            return (
              <div className="flex flex-column movie-list-box">
                <h2 className="movie-year fs-20 my-3">Filter Movies</h2>
                <FilterMovies
                  key={index}
                  lastMovieElementRef={lastMovieElementRef}
                  movieList={filteredMovies}
                />
              </div>
            );
          })}
      </>
      {loading &&
        filteredMovies?.length === 0 &&
        Object.keys(yearWiseMovies)?.length === 0 && (
          <MovieListShimmer cardsCount={10} />
        )}
    </div>
  );
};

export default MovieContainer;
