import React from "react";
import { Link } from "react-router-dom";
import FavoriteBorder from "@mui/icons-material/Favorite";

const Movie = ({ movie, index, favorited, toggleFavorite }) => {
  const isFavorited = favorited[index];

  return (
    <div key={index} className="border p-4 mb-5">
      <div>
        <div className="relative">
          <div>
            <Link
              to={`/movie/${movie.id}`}
              className="grid place-items-center place-content-center"
            >
              <div className="overflow-hidden">
                <img
                  className="h-[400px] gap-2 border border-gray-200 hover:scale-110 transition duration-300 "
                  id={movie.id}
                  key={index}
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt="movie"
                />
              </div>
            </Link>
          </div>
          <div
            onClick={() => toggleFavorite(index)} // Pass the index to toggleFavorite
            className={`cursor-pointer absolute top-5 right-5 ${
              isFavorited ? "text-red-500" : "text-white"
            } hover:text-[#red]-500 hover:scale-150`}
          >
            <FavoriteBorder />
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-500 text-[11px]">
            {movie.release_date.slice(0, 4)}
          </p>
          <p className="font-bold text-sm">{movie.title}</p>
        </div>
      </div>
    </div>
  );
};

export default Movie;
