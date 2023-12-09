import React from "react";
import "./MovieCard.scss";
import StarImg from "../../assets/images/star.png"

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
        className="movie-img"
      />
      <div className="movie-desc">
        <h3 className="movie-title">{title}</h3>
        <p className="movie-vote flex align-center">
          {vote_average}
          <img
            src={StarImg}
            alt="star-img"
            className="rating-img"
          />
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
