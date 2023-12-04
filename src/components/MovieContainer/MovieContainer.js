import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MovieContainer.scss";
import { API_KEY, BASE_URL } from "../../utils/apiURL";
import axios from "axios";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieContainer.scss";

export const MovieCardShimmer = ({ cardsCount }) => {
  return Array.from({ length: cardsCount }).map((el, i) => {
    return (
      <div key={i} className="movie movie-loading">
        <div className=""></div>
      </div>
    );
  });
};

const MovieContainer = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [movieYear, setMovieYear] = useState("2023");

  const fetchMoviesList = async () => {
    try {
      const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&primary_release_year=${movieYear}&page=1&vote_count.gte=100`;
      const options = {
        params: {
          language: "en",
        },
        headers: {
          accept: "application/json",
        },
      };
      setIsLoading(true);
      axios.get(url, options)
        .then((response) => {
          console.log("movies::", response, response?.data?.results);
          setMovies(response?.data?.results);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {}
    finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMoviesList();
  }, []);

  return (
    <>
    <h2>{movieYear}</h2>
    <div className="movie-container">
      {movies?.length === 0 || isLoading ? (
        <MovieCardShimmer cardsCount={10} />
      ) : (
        movies?.map((movie) => {
          return (
            <div key={movie?.id} className="movie">
              <MovieCard info={movie} />
            </div>
          );
        })
      )}
    </div>
    </>
  );
};

export default MovieContainer;
