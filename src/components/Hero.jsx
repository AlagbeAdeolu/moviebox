import React, { useEffect, useState } from "react";
import useHttp from "../hooks/useHttp";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState("");
  const [randomMovie, setRandomMovie] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const navigate = useNavigate();

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
    console.log(results.results)
    navigate("/search", {state:{ state: { results: results.results } }});
  };

  return (
    <div className="relative">
      {/* Search Bar */}
      <div className="md:flex w-full justify-between items-center absolute z-50 text-white p-8">
        {/* Logo */}
        <div className="flex mb-4 font-bold text-3xl gap-4 items-center">
        <img src='/assets/Logo.svg' alt='' />
        </div>
        {/* Search */}
        <div className="flex mb-4 justify-center lg:w-1/2">
          <form className="max-w-[500px] flex items-center justify-center relative" onSubmit={submitHandler}>
            <input
              className="bg-transparent px-4 py-2 text-white   border max-w-[350px] md:w-[500px] border-[#ffffff] rounded-lg placeholder-[#ffffff] "
              type="text"
              placeholder="What do you want to watch?"
              value={searchQuery}
              id="search"
              onChange={handleSearchQuery}
            />
            <div onClick={submitHandler} className="cursor-pointer absolute flex  right-2">

            <SearchIcon />
            </div>
          </form>
        </div>
        {/* sign in */}
        <div className="absolute top-9 right-2 md:static flex items-center justify-end gap-2">
          <p className="text-sm">Sign in</p>
          <img src="/assets/Menu.svg" alt="" />
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
              <div className="lg:text-3xl container color z-20 text-[#F5F5F5] absolute top-[50%] left-[5%] w-[75%] md:w-[35%] text-justify">
                <p className="font-bold text-lg md:text-[50px] mb-5">{item.title}</p>
                <p className="text-[10px] lg:text-sm font-thin">
                  {item.overview}
                </p>
                <div className=" flex items-center justify-center md:w-[40%] text-xs py-2 px-4 mt-4 gap-2 rounded-md bg-[#BE123C] cursor-pointer">
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
