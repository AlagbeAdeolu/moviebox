import React, { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { useMovieApi } from "../store/moviesContext";
import Card from "./Card";
import LoadingSpinner from "./LoadingSpinner";

const FeaturedMovies = () => {
  const { isLoading, error, movies } = useMovieApi();
  const [favorited, setFavorited] = useState(Array(movies.length).fill(false));
  const toggleFavorite = (index) => {
    const updatedFavoritedMovies = [...favorited];
    updatedFavoritedMovies[index] = !updatedFavoritedMovies[index];
    setFavorited(updatedFavoritedMovies);
  };

  return (
    <>
    {isLoading && !error && <LoadingSpinner /> }
    
    <div className="px-8 py-10 mb-5">
      <div className="flex justify-between items-center mb-5 px-4 ">
        <h2 className="text-xl font-semibold">Featured Movie</h2>
        <div className="cursor-pointer items-center text-sm text-[#909090] hover:text-[red] flex gap-2 ">
          <p>See more</p>
          <ArrowForwardIosIcon className="text-sm" />
        </div>
      </div>

      <div className="grid grid-col md:grid-cols-2 lg:grid-cols-4 border-b place-items-center">
        {!isLoading && !error && movies.map((movie, index) => {
          return (
            <Card
              key={index}
              movie={movie}
              index={index}
              favorited={favorited}
              toggleFavorite={toggleFavorite}
            />
          );
        })}
      </div>
    </div>
    </>
  );
};

export default FeaturedMovies;
