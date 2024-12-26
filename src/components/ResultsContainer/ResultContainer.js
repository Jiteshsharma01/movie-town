import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { API_KEY, BASE_URL } from "../../utils/apiURL";
import MovieList from "../MovieContainer/MovieList";
import { clearFilteredMovie, filterMovie } from "../../utils/movieSlice";
import { useDispatch } from "react-redux";

const ResultContainer = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search_query");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState();
  console.log({query});
  
  useEffect(() => {
    const fetchSearchResults = async (query) => {
      setLoading(true);
      dispatch(clearFilteredMovie());
      try {
        const response = await axios.get(`${BASE_URL}/search/movie`, {
          params: {
            api_key: API_KEY,
            query: query,
            include_adult: false,
            language: 'en-US',
            page: 1
          }
        });
        let movieData = {
          [query]: response?.data?.results,
        };
        setSearchResult(movieData);
        dispatch(filterMovie(movieData));
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults(query);
    }
  }, [query]);
  
  return (
    <div className="bg-dark2 text-white flex-auto overflow-y-scroll">
      <div className="movie-container flex flex-column p-2">
        {searchResult && Object.values(searchResult)?.length > 0
          && Object.keys(searchResult)?.map((key) => {
            return (
              <MovieList
                key={key}
                movieList={searchResult[key]}
                movieYear={key}
              />
            );
          })
        }
        {loading ? (
          <h4 className="fs-16 my-3 ls-1 px-2">Loading...</h4>
        ) : (
          <h4 className="fs-16 my-3 ls-1 px-2">No movies found!!!</h4>
        )}
      </div>
    </div>
  );
};

export default ResultContainer;
