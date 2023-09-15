import Card from "../components/Card";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const SearchResults = (props) => {
  const location = useLocation();
  console.log(location);

  const { results } = location.state.state;
  const data = results.map((item) => (
    <Link className="flex flex-col" to={`/movie/${item.id}`} key={item.id}>
      {item.title}
    </Link>
  ));
  console.log(data);
  return (
    <div className="p-[40px]">
      <div className="flex justify-between mb-8">
      <p className="md:text-3xl">Search Results</p>
      <p className="border p-4 rounded-2xl bg-[#BE123C]"><Link to={'/'}>Home</Link></p>

      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {results.map((item, index) => {
          return <Card key={index} movie={item} index={index} />;
        })}
      </div>
    </div>
  );
};

export default SearchResults;
