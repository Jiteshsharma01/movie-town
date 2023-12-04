import React from "react";
import "./MovieCard.scss";

const MovieCard = ({ info }) => {
  const {
    backdrop_path,
    poster_path,
    original_title,
    title,
    vote_average,
    vote_count,
  } = info;
  return (
    <div className="movie-box">
      <img
        src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
        loading="lazy"
        alt={title}
      />
      <div className="movie-desc">
        <p>{title}</p>
        <p>{vote_average}</p>
      </div>
    </div>
  );
};

export default MovieCard;
