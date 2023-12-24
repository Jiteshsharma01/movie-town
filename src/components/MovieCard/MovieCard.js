import React from "react";
import "./MovieCard.scss";
import StarImg from "../../assets/images/star.png";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ info }) => {
  const {
    backdrop_path,
    id,
    poster_path,
    original_title,
    title,
    vote_average,
    vote_count,
  } = info;

  const navigate = useNavigate();

  const movieHandler = (_id) => {
    navigate(`/movie/${_id}`);
  };

  return (
    <div className="movie-box" onClick={() => movieHandler(id)}>
      <img
        src={`https://image.tmdb.org/t/p/original${
          poster_path ? poster_path : backdrop_path
        }`}
        loading="lazy"
        alt={title}
        className="movie-img"
      />
      <div className="movie-desc">
        <h3 className="movie-title">{title}</h3>
        <p className="movie-vote flex align-center">
          {vote_average}
          <img src={StarImg} alt="star-img" className="rating-img" />
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
