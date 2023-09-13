import { Menu } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import useHttp from "../hooks/useHttp";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState("");
  const [randomMovie, setRandomMovie] = useState([]);

  const {
    isLoading,
    error,
    sendRequest: fetchSearchedMovie,
    sendRequest: fetchRandomMovie,
  } = useHttp();

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const transformData = (movies) => {
      setResults(movies);
    };
    fetchSearchedMovie(
      {
        url: `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`,
      },
      transformData
    );
  }, [fetchSearchedMovie, searchQuery]);

  useEffect(() => {
    const transformData = (data) => {
      setRandomMovie(data.results.slice(0, 6));
    };
    fetchRandomMovie(
      { url: "https://api.themoviedb.org/3/discover/movie" },
      transformData
    );
  }, [fetchRandomMovie]);

  console.log(randomMovie.map((item) => `https://image.tmdb.org/t/p/w500/${item.poster_path}`));
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(results);
  };

  return (
    <div>
      <div className="grid grid-cols-3">
        <div></div>
        <div className="flex w-full">
          <form onSubmit={submitHandler}>
            <label htmlFor="search">Search</label>
            <input
              className="border border-gray-500"
              type="text"
              placeholder="What do you want to watch?"
              value={searchQuery}
              id="search"
              onChange={handleSearchQuery}
            />
            <button className="border bg-gray-500">Submit</button>
          </form>
        </div>
        <div>
          <p>Sign in</p>
          <Menu />
        </div>
        Hero
      </div>
      <div>
        {randomMovie.map((item, index) => {
          return (
            <div key={index}>
              <div className="w-full h-[600px] ">
                <img
                  className="h-full w-full object-cover "
                  src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                  alt=""
                />
              </div>
              <p>{item.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hero;
