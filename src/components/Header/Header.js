import React, { useEffect, useState } from "react";
import AppLogo from "../../assets/images/app-logo.png";
import axios from "axios";
import { API_KEY, BASE_URL } from "../../utils/apiURL";
import "./Header.scss";
import SearchBox from "./SearchBox";
import { useDispatch } from "react-redux";
import {
  addMovie,
  clearFilteredMovie,
  clearMovie,
  filterMovie,
} from "../../utils/movieSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [genreList, setGenresList] = useState([]);
  const [activeGenre, setActiveGenre] = useState({});
  const dispatch = useDispatch();
  const initialGenreData = {
    id: "All",
    name: "All",
  };

  const fetchGenres = async () => {
    try {
      const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`;
      const options = {
        params: {
          language: "en",
        },
        headers: {
          accept: "application/json",
        },
      };
      axios
        .get(url, options)
        .then((response) => {
          setGenresList(response?.data?.genres);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {}
  };

  useEffect(() => {
    setActiveGenre(initialGenreData);
    localStorage.setItem("activeGenre", JSON.stringify(initialGenreData));
    fetchGenres();
  }, []);

  const fetchMovie = async () => {
    try {
      const year = 2012;
      const response = await axios.get(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&primary_release_year=${year}&page=1&vote_count.gte=100`
      );
      let movieData = {
        [year]: response?.data?.results,
      };
      dispatch(addMovie(movieData));
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const fetchMovieByGenre = async (genreData) => {
    dispatch(clearMovie());
    const { id } = genreData;
    try {
      const response = await axios.get(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&sort_by=release_date.desc&page=1&with_genres=${id}`
      );
      let movieData = {
        ...response?.data?.results,
      };
      // let movieData = {
      //   [id]: response?.data?.results,
      // };
      // dispatch(addMovie(movieData));
      dispatch(filterMovie(movieData));
      dispatch(clearMovie());
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const getMovieByGenre = (genre) => {
    setActiveGenre(genre);
    localStorage.setItem("activeGenre", JSON.stringify(genre));
    if (genre?.id === "All") {
      fetchMovie();
      dispatch(clearFilteredMovie());
    } else {
      fetchMovieByGenre(genre);
      dispatch(clearMovie());
    }
  };

  return (
    <div className="header-box bg-dark">
      <div onClick={() => navigate("/")}>
        <img src={AppLogo} alt="app-logo" />
      </div>
      <SearchBox />
      <div className="genre-list-box">
        <button
          className={`genre-btn ${
            activeGenre?.id === "All" ? "active-genre" : ""
          }`}
          onClick={() => getMovieByGenre(initialGenreData)}
        >
          All
        </button>
        {genreList?.map((genre) => {
          return (
            <button
              className={`genre-btn ${
                activeGenre?.id === genre?.id ? "active-genre" : ""
              }`}
              key={genre?.id}
              onClick={() => getMovieByGenre(genre)}
            >
              {genre?.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
