import React, { useEffect, useState } from "react";
import AppLogo from "../../assets/images/app-logo.png";
import axios from "axios";
import { API_KEY, BASE_URL } from "../../utils/apiURL";
import "./Header.scss";
import SearchBox from "./SearchBox";
import { useDispatch } from "react-redux";
import { addMovie, clearFilteredMovie, filterMovie } from "../../utils/movieSlice";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [genreList, setGenresList] = useState([]);
  const [activeGenre, setActiveGenre] = useState({});
  const [selectedGenre, setSelectedGenre] = useState([]);
  const dispatch = useDispatch();
  const initialGenreData = { id: "All", name: "All" };

  // Fetch genre list from the API
  const fetchGenres = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/genre/movie/list`, {
        params: { api_key: API_KEY, language: "en" },
        headers: { accept: "application/json" },
      });
      setGenresList(data?.genres || []);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  // Fetch popular movies
  const fetchMovies = async () => {
    try {
      const year = 2012;
      const { data } = await axios.get(`${BASE_URL}/discover/movie`, {
        params: {
          api_key: API_KEY,
          sort_by: "popularity.desc",
          primary_release_year: year,
          page: 1,
          vote_count_gte: 100,
        },
      });
      const movieData = { [year]: data?.results };
      dispatch(addMovie(movieData));
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Fetch movies by selected genres
  const fetchMoviesByGenre = async (genres) => {
    try {
      const genreIds = genres.map((genre) => genre.id).join(",");
      const { data } = await axios.get(`${BASE_URL}/discover/movie`, {
        params: {
          api_key: API_KEY,
          language: "en-US",
          sort_by: "release_date.desc",
          page: 1,
          with_genres: genreIds,
        },
      });
      dispatch(filterMovie(data?.results || []));
    } catch (error) {
      console.error("Error fetching movies by genre:", error);
    }
  };

  // Handle genre selection
  const handleGenreSelection = (genre) => {
    const isSelected = selectedGenre.some((g) => g.id === genre.id);
    const updatedGenres = isSelected
      ? selectedGenre.filter((g) => g.id !== genre.id)
      : [...selectedGenre, genre];

    setSelectedGenre(updatedGenres);
    if (updatedGenres.length === 0) {
      fetchMovies();
      dispatch(clearFilteredMovie());
    } else {
      fetchMoviesByGenre(updatedGenres);
    }
  };

  // Handle search input clear
  const handleSearchClear = () => {
    navigate(-1);
    dispatch(clearFilteredMovie());
  };

  // Initialize component
  useEffect(() => {
    setActiveGenre(initialGenreData);
    localStorage.setItem("activeGenre", JSON.stringify(initialGenreData));
    fetchGenres();
    fetchMovies();
  }, []);

  return (
    <div className="header-box bg-dark">
      <div className="search-container">
        <Link to="/">
          <img src={AppLogo} alt="app-logo" />
        </Link>
        <SearchBox onClear={handleSearchClear} />
      </div>
      <div className="genre-list-box">
        <button
          className={`genre-btn ${activeGenre?.id === "All" ? "active-genre" : ""}`}
          onClick={() => handleGenreSelection(initialGenreData)}
        >
          All
        </button>
        {genreList.map((genre) => (
          <button
            key={genre.id}
            className={`genre-btn ${
              selectedGenre.some((g) => g.id === genre.id) ? "active-genre" : ""
            }`}
            onClick={() => handleGenreSelection(genre)}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Header;
