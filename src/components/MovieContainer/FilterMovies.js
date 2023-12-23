import MovieCard from "../MovieCard/MovieCard";

const FilterMovies = ({ movieList, lastMovieElementRef }) => {
  return (
    movieList?.length > 0 && (
      <div className="movie-data-list">
        {movieList?.map((movie, index) => {
          const uniqueKey = `${movie.id}-${index}`;
          if (movieList?.length === index + 1) {
            return (
              <div ref={lastMovieElementRef} key={uniqueKey} className="movie">
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
    )
  );
};

export default FilterMovies;
