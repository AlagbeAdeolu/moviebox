import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../hooks/useHttp";
import Movie from "../components/Movie";
import LoadingSpinner from "../components/LoadingSpinner";

const MovieDetail = () => {
  const [movieDetails, setMovieDetails] = useState({});
  const [genres, setGenres] = useState([]);
  const { id } = useParams();

  const { isLoading, error, sendRequest: getMovieDetail } = useHttp();

  useEffect(() => {
    // Fetch movie details
    getMovieDetail(
      { url: `https://api.themoviedb.org/3/movie/${id}` },
      (data) => {
        setMovieDetails(data);
        setGenres(data.genres); 
      }
    );
  }, [getMovieDetail, id]);

  return (
    <>
    {isLoading && <LoadingSpinner /> }
      {!isLoading && error && alert('Something went wrong')}
      {!isLoading && !error && (
        <Movie movieDetails={movieDetails} id={id} genres={genres} />
      )}
    </>
  );
};

export default MovieDetail;
