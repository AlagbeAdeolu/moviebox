import { Menu } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import useHttp from "../hooks/useHttp";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState("");
  const [randomMovie, setRandomMovie] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const { sendRequest: fetchSearchedMovie, sendRequest: fetchRandomMovie } =
    useHttp();

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % randomMovie.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [randomMovie.length]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(results);
  };

  return (
    <div className="relative">
      {/* Search Bar */}
      <div className="flex w-full justify-between absolute z-50 text-white p-8">
        {/* Logo */}
        <div className="flex font-bold text-3xl gap-4 items-center">
          <PersonalVideoIcon />
          MovieBox
        </div>
        {/* Search */}
        <div className="flex justify-center lg:w-1/2">
          <form className='flex' onSubmit={submitHandler}>
            <input
              className="bg-transparent border w-[500px] border-[#ffffff] rounded-lg placeholder-[#ffffff] "
              type="text"
              placeholder="What do you want to watch?"
              value={searchQuery}
              id="search"
              onChange={handleSearchQuery}
            />
            <button className="border bg-gray-500">Submit</button>
          </form>
        </div>
        {/* sign in */}
        <div className="flex">
          <p className=" w-full text-sm">Sign in</p>
          <Menu />
        </div>
      </div>
      {/* Image Carousel */}
      <div className="">
        {randomMovie.map((item, index) => {
          const isActive = index === currentPage;
          return (
            <div
              className={`transition-opacity relative duration-300 ease-in opacity-${
                isActive ? "100" : "0" // Apply opacity transition
              } ${isActive ? "" : "hidden"}`}
              key={index}
            >
              <div className="relative h-[500px] lg:h-full">
                {/* Overlay */}
                <div className=" absolute w-full h-full z-10 opacity-30 bg-blue-800"></div>
                {/* image */}
                <img
                  className=" h-full w-full object-cover  "
                  src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                  alt=""
                />
              </div>
              <div className="font-bold text-md lg:text-3xl color z-20 text-[#F5F5F5] absolute top-[50%] left-[5%] w-[35%] text-justify">
                <p>{item.title}</p>
                <p className="text-[10px] lg:text-sm font-thin">
                  {item.overview}
                </p>
                <div className=" flex items-center justify-center w-[40%] text-sm py-2 px-4 mt-4 gap-2 rounded-md bg-[#BE123C] cursor-pointer">
                  <PlayCircleFilledWhiteIcon />
                  Watch trailer
                  </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hero;
