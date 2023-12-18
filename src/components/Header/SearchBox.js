import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_KEY, BASE_URL } from "../../utils/apiURL";
import { useDispatch } from "react-redux";
import { addMovie, clearMovie } from "../../utils/movieSlice";
import SearchLogo from "../../assets/images/search-icon.png";
import "./Header.scss";

const SearchBox = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delay = 500;
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchText);
    }, delay);
    return () => clearTimeout(timerId);
  }, [searchText]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      dispatch(clearMovie());
      try {
        const response = await axios.get(
          `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${debouncedSearchTerm}&include_adult=false&language=en-US&page=1`
        );
        let movieData = {
          [debouncedSearchTerm]: response?.data?.results,
        };
        dispatch(addMovie(movieData));
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    if (debouncedSearchTerm) {
      fetchSearchResults();
    }
  }, [debouncedSearchTerm]);

  const onChangeHandler = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div className="search-box">
      <input className="search-input" value={searchText} onChange={onChangeHandler} />
      <img src={SearchLogo} alt="search-icon" className="search-img" />
    </div>
  );
};

export default SearchBox;
