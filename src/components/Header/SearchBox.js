import React, { useEffect, useState } from "react";
import SearchLogo from "../../assets/images/search-icon.png";
import CancelIcon from "../../assets/images/cancel-icon.png";
import "./Header.scss";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const delay = 500;
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchText);
    }, delay);
    return () => clearTimeout(timerId);
  }, [searchText]);

  const onChangeHandler = (event) => {
    setSearchText(event.target.value);
  };

  const redirectToSearch = (searchText) => {
    navigate(`/results?search_query=${searchText?.replaceAll(" ", "+")}`);
  };

  return (
    <div className="search-box">
      <div className="search-input-box">
        <input
          className="search-input"
          value={searchText}
          onChange={onChangeHandler}
        />
        {searchText && (
          <button
            className="cancel-btn"
            type="button"
            onClick={() => setSearchText("")}
          >
            <img src={CancelIcon} alt="cancel-icon" className="cancel-img" />
          </button>
        )}
        <button className="search-btn" onClick={() => redirectToSearch(searchText)} type="button">
          <img src={SearchLogo} alt="search-icon" className="search-img" />
        </button>
      </div>
      <div className="user-box">A</div>
    </div>
  );
};

export default SearchBox;
