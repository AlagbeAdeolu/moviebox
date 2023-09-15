import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import VideocamIcon from "@mui/icons-material/Videocam";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import ListIcon from "@mui/icons-material/List";

const Movie = (props) => {
  const {
    backdrop_path,
    title,
    overview,
    release_date,
    vote_average,
    runtime,
    vote_count,
  } = props.movieDetails;

  console.log(props.movieDetails);


  return (
    <div className="flex text-[#333333]">
      {/* left */}
      <div className="hidden md:px-[5%] bg-[#F9E8EC] border-none border-r-2 h-[100vh] md:flex flex-col items-center justify-between py-8 rounded-r-[60px]">
        {/* top */}
        <div className="flex font-bold text-3xl gap-4 items-center">
          <img className="text-[black]" src="/assets/Logo.svg" alt="logo" />
        </div>
        {/* middle */}
        <div className="flex flex-col gap-[40px] mx-auto text-[#909090]">
          <Link
            to={"/"}
            className="flex gap-4 items-center text-lg hover:text-[#BE123C]"
          >
            <HomeIcon />
            Home
          </Link>
          <div className="cursor-pointer flex gap-4 items-center text-lg hover:text-[#BE123C]">
            <VideocamIcon />
            Movies
          </div>
          <div className="cursor-pointer flex gap-4 items-center text-lg hover:text-[#BE123C]">
            <OndemandVideoIcon />
            TV Series
          </div>
          <div className="cursor-pointer flex gap-4 items-center text-lg hover:text-[#BE123C]">
            <EventNoteIcon />
            Upcoming
          </div>
        </div>
        {/* bottom */}
        <div>
          <LogoutIcon />
          Log out
        </div>
      </div>
      {/* right */}
      <div className="flex flex-col p-8">
        {/* Poster Image */}
        <div className="flex container lg:w-[700px] justify-center items-center">
          <img
            className="rounded-lg"
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt="/"
          />
        </div>
        {/* title, release date and runtime */}
        <div className=" md:flex gap-4 text-gray-700 items-center font-semibold justify-between mt-4 mb-2">
          <div className="md:flex gap-4 text-md lg:text-lg">
            {title ? (
              <h1 data-testid="movie-title">{title}</h1>
            ) : (
              <p>Not Found</p>
            )}{" "}
            &#x2022;
            <div className="md:flex gap-2 mb-2 md:mb-0">
              <p data-testid="movie-release-date">{release_date + 'T00:00:00.000Z'}</p>
              &#x2022;
              <p data-testid="movie-runtime">{runtime} mins</p>
            </div>
          </div>
          <div>
            <p className="text-sm">
              ⭐
              <span className="font-thin text-sm text-[#909090]">
                {parseFloat(vote_average).toFixed(1)}
              </span>{" "}
              | <span className="font-semibold">{vote_count}</span>
            </p>
          </div>
        </div>
        {/* Genre */}
        <div className="mb-2 flex gap-2">
          Genres:
          {props.genres.map((genre) => (
            <p className="text-sm border rounded-full p-1">{genre.name}</p>
          ))}
        </div>
        {/* Movie Overview */}
        <div className="lg:flex gap-5 w-full">
          <div>
            <article data-testid="movie-overview">{overview}</article>
          </div>
          <div className="w-full text-sm">
            <button className="w-full px-12 py-2 rounded-lg text-white border border-b-0 bg-[#BE123C]">
              <ConfirmationNumberIcon />
              See Showtimes
            </button>
            <button className="w-full px-12 py-2 rounded-lg text-[#333333] font-semibold border border-b-0 bg-[#F9E8EC]">
              <ListIcon />
              More watch options
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
