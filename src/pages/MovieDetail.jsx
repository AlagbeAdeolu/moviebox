import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../hooks/useHttp";
import Card from "../components/Card";

const MovieDetail = () => {
  const [movieDetails, setMovieDetails] = useState({});
  const [genres, setGenres] = useState([]);
  const { id } = useParams();

  const { sendRequest: getMovieDetail } = useHttp();

  useEffect(() => {
    // Fetch movie details
    getMovieDetail(
      { url: `https://api.themoviedb.org/3/movie/${id}` },
      (data) => {
        setMovieDetails(data);
        setGenres(data.genres); // Set genres data from the API response
      }
    );
  }, [getMovieDetail, id]);

  return <Card movieDetails={movieDetails} id={id} genres={genres} />;
};

export default MovieDetail;
