import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import VideocamIcon from "@mui/icons-material/Videocam";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

const Card = (props) => {
  const {
    backdrop_path,
    title,
    overview,
    release_date,
    vote_average,
    runtime,
    vote_count,
  } = props.movieDetails;
  const year = +(release_date);


  return (
    <div className="flex text-[#333333]">
      {/* left */}
      <div className="hidden md:px-[5%] border border-r-2 h-[100vh] md:flex flex-col justify-between py-8">
        {/* top */}
        <div></div>
        {/* middle */}
        <div className="flex flex-col gap-[40px] mx-auto text-[#909090]">
          <Link to={'/'} className="flex gap-4 items-center text-lg hover:text-[#BE123C]">
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
        <div className="flex container justify-center items-center">
          <img src={`https://image.tmdb.org/t/p/original/${backdrop_path}`} alt="/" />
        </div>
        {/* title, release date and runtime */}
        <div className=" flex gap-4 text-[#909090] font-semibold justify-between mt-4 mb-2">
          <div className="flex gap-4 text-xs md:text-md lg:text-lg">
            {title ? (
              <h1 data-testid="movie-title">{title}</h1>
            ) : (
              <p>Not Found</p>
            )}
            <div className="flex gap-2">
              <p data-testid="movie-release-date">{year}</p>
              <p data-testid="movie-runtime">{parseFloat(runtime)} mins</p>
            </div>
          </div>
          <div>
            <p>
              ⭐
              <span className="font-thin text-[#909090]">
                {parseFloat(vote_average).toFixed(1)}
              </span>{" "}
              | <span className="font-semibold">{vote_count}</span>
            </p>
          </div>
        </div>
        {/* Genre */}
        <div className="mb-2">
          <p className="text-sm">
            Genres: {props.genres.map((genre) => genre.name).join(", ")}
          </p>
        </div>
        {/* Movie Overview */}
        <div className="lg:flex gap-5 w-full">
          <div>
            <article data-testid="movie-overview">{overview}</article>
          </div>
          <div className="w-full">
            <button className="w-full px-12 py-2 rounded-lg text-white border border-b-0 bg-[#BE123C]">
              See Showtimes
            </button>
            <button className="w-full px-12 py-2 rounded-lg text-[#333333] font-semibold border border-b-0 bg-[#F9E8EC]">
              More watch options
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
