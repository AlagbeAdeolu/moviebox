import React, {useState} from "react";
import { Link } from "react-router-dom";
import FavoriteBorder from "@mui/icons-material/Favorite";
import { useMovieApi } from "../store/moviesContext";

const Card = ({ movie, index}) => {
  
  const { movies } = useMovieApi();
  const [favorited, setFavorited] = useState(Array(movies.length).fill(false));
  const toggleFavorite = (index) => {
    const updatedFavoritedMovies = [...favorited];
    updatedFavoritedMovies[index] = !updatedFavoritedMovies[index];
    setFavorited(updatedFavoritedMovies);
  };
  const isFavorited = favorited[index];

  return (
    <div key={index} data-testid="movie-card" className="border p-4 mb-5">
      <div>
        <div className="relative">
          <div>
            <Link
              to={`/movie/${movie.id}`}
              className="grid place-items-center place-content-center"
            >
              <div data-testid="movie-poster" className="overflow-hidden">
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
            onClick={() => toggleFavorite(index)}
            className={`cursor-pointer absolute top-5 right-5 ${
              isFavorited ? "text-red-500" : "text-white"
            } hover:text-[#red]-500 hover:scale-150`}
          >
            <FavoriteBorder />
          </div>
        </div>

        <div className="mt-4">
          <p
            data-testid="movie-release-date"
            className="uppercase text-gray-500 text-[11px]"
          >
            {movie.release_date.slice(0, 4)}
          </p>
          <p data-testid="movie-title" className="font-bold text-sm">
            {movie.title}
          </p>
          <div className="mt-1 flex justify-between text-xs font-light">
            <div className="flex gap-1 items-center justify-center" >
              <img src="/icon.png" className="h-[20px] " alt="/" />
              <p>{(+movie.vote_average * 10).toFixed(0)}/100</p>
            </div>
            <div className="flex gap-1 items-center justify-center">
              🍅<p>{(+movie.vote_average ).toFixed(0) * 10}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
