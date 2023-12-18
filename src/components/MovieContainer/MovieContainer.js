import React, { useCallback, useEffect, useRef, useState } from "react";
import "./MovieContainer.scss";
import "./MovieContainer.scss";
import useInfiniteScroll from "../../utils/useInfiniteScroll";
import MovieList, { MovieListShimmer } from "./MovieList";
import { useSelector } from "react-redux";

const MovieContainer = () => {
  const [movieYear, setMovieYear] = useState(2012);
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  
  const movies = useSelector(store => store?.movieList?.movieData);
  
  const { loading, error, hasMore, movieList, yearWiseData } = useInfiniteScroll(limit, skip, movieYear);

  const [yearWiseMovies, setYearWiseMovies] = useState(movies);
  
  useEffect(() => {
    // let _data = {};
    // if(Object.keys(movies).length){
    //   _data = {...movies};
    // }
    // setYearWiseMovies({..._data, ...yearWiseData});
    setYearWiseMovies(yearWiseData);
  }, [yearWiseData]);

  useEffect(() => {
    let _data = {};
    if(Object.keys(movies).length){
      _data = {...movies};
    }
    setYearWiseMovies(_data);
  }, [movies]);

  console.log("sknsd", movies, yearWiseMovies);

  const firstMovieElementRef = useRef();
  const observer = useRef();
  const lastMovieElementRef = useCallback(node => {
    if (loading) return;
    if (observer?.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMore){
        setMovieYear(prevYear => prevYear + 1);
      }
    })
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);
  
  return (
    <div className="movie-container flex flex-column">
      { yearWiseMovies && Object.keys(yearWiseMovies)?.map((key) => {
        return (
          <MovieList 
            key={key}
            movieYear={key}
            limit={limit}
            skip={skip}
            yearWiseMovies={yearWiseMovies}
            setYearWiseMovies={setYearWiseMovies}
            firstMovieElementRef={firstMovieElementRef} 
            lastMovieElementRef={lastMovieElementRef} 
            movieList={yearWiseMovies[key]} 
          />
          // {/* <MovieList 
          // movieYear={2021} 
          // firstMovieElementRef={firstMovieElementRef} 
          // lastMovieElementRef={lastMovieElementRef} 
          // movieList={movieData} 
          // /> */}
        )
      })}
      {loading && <MovieListShimmer cardsCount={10} />}
    </div>
  );
};

export default MovieContainer;
