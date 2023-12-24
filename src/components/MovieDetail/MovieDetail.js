import axios from "axios";
import { API_KEY, BASE_URL } from "../../utils/apiURL";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./MovieDetail.scss";

const MovieDetail = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState({});

  useEffect(() => {
    fetchMovie(id);
  }, [id]);

  const fetchMovie = async (movieId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
      );
      setMovieData(response?.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  if (Object.keys(movieData)?.length === 0) return null;
  return (
    <Link to={movieData?.homepage} className="text-white">
      <div className="flex flex-column movie-detail-box w-full">
        <div className="p-1 img-box">
          <img
            alt="movie-img"
            className="movie-img w-full"
            src={`https://image.tmdb.org/t/p/original${movieData?.backdrop_path}`}
          />
        </div>
        <div className="flex flex-column p-2 desc-box">
          <div className="company-logo">
            <img
              alt="movie-img"
              className="movie-img w-full"
              src={`https://image.tmdb.org/t/p/original${movieData?.production_companies[0]?.logo_path}`}
            />
          </div>
          <div className="flex flex-column ls-1 movie-desc">
            <h3 className="movie-title ls-1">{movieData?.title}</h3>
            <p className="flex genre-box">
              <span className="desc-head fw-6 ls-1">Release Year:</span>
              {new Date(movieData?.release_date).getFullYear()}
            </p>
            <p className="flex flex-wrap genre-box">
              <span className="desc-head fw-6 ls-1">Genre(s):</span>
              {movieData?.genres?.map((genre, index) => {
                if (movieData?.genres?.length === index + 1)
                  return <span key={genre?.id}>{genre?.name}</span>;
                else return <span key={genre?.id}>{genre?.name}, </span>;
              })}
            </p>
            <p className="flex lang-box">
              <span className="desc-head fw-6 ls-1">Language(s):</span>
              {movieData?.spoken_languages?.map((lang, index) => {
                if (movieData?.spoken_languages?.length === index + 1)
                  return (
                    <span key={lang?.iso_639_1}>{lang?.english_name}</span>
                  );
                else
                  return (
                    <span key={lang?.iso_639_1}>{lang?.english_name}, </span>
                  );
              })}
            </p>
            <p className="overview-box">
              <span className="desc-head fw-6 ls-1">Overview:</span>
              {movieData?.overview}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieDetail;