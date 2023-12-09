import React, { useCallback, useEffect, useRef, useState } from "react";
import "./MovieContainer.scss";
import "./MovieContainer.scss";
import useInfiniteScroll from "../../utils/useInfiniteScroll";
import MovieList, { MovieListShimmer } from "./MovieList";
import axios from "axios";
import { API_KEY, BASE_URL } from "../../utils/apiURL";

const MovieContainer = () => {
  const [movieYear, setMovieYear] = useState(2012);
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const ref = useRef(null);
  // const [yearWiseData, setYearWiseData] = useState({});
  // const [movieData, setmovieData] = useState([]);

  const { loading, error, hasMore, movieList, yearWiseData } = useInfiniteScroll(limit, skip, movieYear);

  const [yearWiseMovies, setYearWiseMovies] = useState({});
  
  useEffect(() => {
    setYearWiseMovies({...yearWiseData});
  }, [yearWiseData]);

  const firstMovieElementRef = useRef();
  // const lastMovieElementRef = useRef();
  const observer = useRef();
  const lastMovieElementRef = useCallback(node => {
    if (loading) return;
    if (observer?.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMore){
        setMovieYear(prevYear => prevYear + 1);
      }
    })
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);
  
  // const firstMovieElementRef = useCallback(node => {
  //   // console.log("skjbd", node, observer);
  //   if (loading) return;
  //   if (observer?.current) observer.current.disconnect();
  //   observer.current = new IntersectionObserver(entries => {
  //     // console.log("skjbd11", entries);
  //     if(entries[0].isIntersecting && hasMore){
  //       // console.log("skjbd22", entries[0]);
  //       setMovieYear(prevYear => prevYear - 1);
  //     }
  //   })
  //   if (node) observer.current.observe(node);
  // }, [loading, hasMore]);
  

  // useEffect(() => {
  //   const fetchApi = () =>{
  //     const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&primary_release_year=${movieYear}&page=1&vote_count.gte=100`;
  //       axios({
  //           method: 'GET',
  //           url: url,
  //           params: { limit: limit, skip: skip },
  //           // cancelToken: new axios.CancelToken(c => cancel = c )
  //       }).then(res => {
  //           // setMovieList(prevProducts => {
  //           //     return [...new Set([...prevProducts, ...res?.data?.results])]
  //           // });
  //           setmovieData(res?.data?.results);
  //           const movieData = {};
  //           if(!yearWiseData.hasOwnProperty(movieYear)){   
  //               movieData[movieYear] = [...res?.data?.results];
  //           }
  //           setYearWiseData(prevData => {return {...prevData, ...movieData}});
  //           // setHasMore(res?.data?.results?.length > 0)
  //           // setLoading(false);
  //       }).catch(e => {
  //           if (axios.isCancel(e)) return;
  //           // setError(true)
  //       })
  //   };
  //   fetchApi();
  // }, [])

  const onScroll = () => {
    const current = ref.current;
    // console.log("reached bottom", ref, current);
    if(current){
      const {scrollTop, clientHeight, scrollHeight} = current;
      const computedScrollHeight = Math.round(scrollTop) + clientHeight;
      if(scrollHeight >= computedScrollHeight-1 && scrollHeight <= computedScrollHeight+1){
        console.log("reached bottom11");
      }
    }
  }

  console.log(`yearWiseMovies`, yearWiseMovies, yearWiseData);

  return (
    <div className="movie-container flex flex-column">
      {/* <div ref={ref} onScroll={onScroll} 
      style={{ border: "2px solid", height: "50vh", position: "fixed",
    background: "black", overflow: "scroll"}}
    > */}
        { yearWiseMovies && Object.keys(yearWiseMovies)?.map((key) => {
          return (
            <MovieList 
              key={key}
              movieYear={key}
              limit={limit}
              skip={skip}
              yearWiseMovies={yearWiseMovies}
              setYearWiseMovies={setYearWiseMovies}
              firstMovieElementRef={firstMovieElementRef} 
              lastMovieElementRef={lastMovieElementRef} 
              movieList={yearWiseMovies[key]} 
            />
            // {/* <MovieList 
            // movieYear={2021} 
            // firstMovieElementRef={firstMovieElementRef} 
            // lastMovieElementRef={lastMovieElementRef} 
            // movieList={movieData} 
            // /> */}
          )
        })}
      {/* </div> */}
      {/* {loading && <MovieListShimmer cardsCount={10} />} */}
      {/* {loading && <div className="loader-container bottom">
        <div className="spinner"></div>
      </div>} */}
    </div>
  );
};

export default MovieContainer;
