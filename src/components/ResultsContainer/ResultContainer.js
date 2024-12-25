import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { API_KEY, BASE_URL } from "../../utils/apiURL";
import MovieList from "../MovieContainer/MovieList";

const ResultContainer = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search_query");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState();
  console.log({query});
  
  useEffect(() => {
    const fetchSearchResults = async (query) => {
      setLoading(true);
      // dispatch(clearMovie());
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
        console.log({response});
        
        setSearchResult(movieData);
        // dispatch(addMovie(movieData));
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

  console.log({searchResult});
  
  return (
    <div className="movie-container flex flex-column p-2">
      {searchResult &&
        Object.keys(searchResult)?.map((key) => {
          return (
            <MovieList
              key={key}
              movieList={searchResult[key]}
              movieYear={key}
            />
          );
        })
      }
    </div>
  );
};

export default ResultContainer;
