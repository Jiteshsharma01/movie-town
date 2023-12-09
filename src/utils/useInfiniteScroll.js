import {useEffect, useState} from "react";
import axios from "axios";
import { API_KEY, BASE_URL } from "./apiURL";

export default function useInfiniteScroll(limit, skip, movieYear) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [movieList, setMovieList] = useState([]);
    const [yearWiseData, setYearWiseData] = useState({});

    useEffect(() => {
        setLoading(true);
        setError(false);
        let cancel;
        const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&primary_release_year=${movieYear}&page=1&vote_count.gte=100`;
        axios({
            method: 'GET',
            url: url,
            params: { limit: limit, skip: skip },
            cancelToken: new axios.CancelToken(c => cancel = c )
        }).then(res => {
            setMovieList(prevProducts => {
                return [...new Set([...prevProducts, ...res?.data?.results])]
            });
            const movieData = {};
            if(!yearWiseData.hasOwnProperty(movieYear)){   
                movieData[movieYear] = [...res?.data?.results];
            }
            setYearWiseData(prevData => {return {...prevData, ...movieData}});
            setHasMore(res?.data?.results?.length > 0)
            setLoading(false);
        }).catch(e => {
            if (axios.isCancel(e)) return;
            setError(true)
        })
        return () => cancel()
    }, [limit, movieYear, skip]);
    
    return { loading, error, hasMore, movieList, yearWiseData };
}