import React, { useEffect, useState } from "react";
import AppLogo from "../../assets/images/app-logo.png";
import axios from "axios";
import { API_KEY, BASE_URL } from "../../utils/apiURL";
import "./Header.scss";

const Header = () => {
  const [genreList, setGenresList] = useState([]);
  const [activeGenre, setActiveGenre] = useState("All");

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
          console.log("lkdnlf", response);
          setGenresList(response?.data?.genres);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {}
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const getMovieByGenre = (genre) => {
    setActiveGenre(genre);
  };

  return (
    <div className="header-box bg-dark">
      <div>
        <img src={AppLogo} alt="app-logo" />
      </div>
      <div className="genre-list-box">
        <button
          className={`genre-btn ${activeGenre === "All" ? "active-genre" : ""}`}
          onClick={() => getMovieByGenre()}
        >
          All
        </button>
        {genreList?.map((genre) => {
          return (
            <button
              className={`genre-btn ${
                activeGenre === genre?.name ? "active-genre" : ""
              }`}
              key={genre?.id}
              onClick={() => getMovieByGenre()}
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
