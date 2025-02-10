import React from "react";
import { Link } from "react-router-dom";
import noimage from '/noimage.png'


const Cards = ({ data,title }) => {
  // console.log(data)
  return (
    <div className="flex w-screen h-full flex-wrap px-[5%] bg-[#1F1E24]">
      {data.map((c, i) => (
        <Link to={`/${c.media_type || title}/details/${c.id}`}
          className="relative w-[30vh] bg-red-500 mx-[4%] my-[3%] rounded"
          key={i} >
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-full object-cover rounded"
            src={c.profile_path || c.poster_path || c.backdrop_path ? `http://image.tmdb.org/t/p/original/${
              c.profile_path || c.poster_path || c.backdrop_path
            }`:noimage}
          />
          <h1 className="text-2xl text-zinc-400 mt-2 font-semibold ml-4">
            {c.name || c.title || c.original_name || c.original_title}
          </h1>
          {c.vote_average && (
            <div className="absolute right-[-12%] bottom-[30%] text-white h-[5vh] w-[5vh] rounded-full bg-yellow-700 flex items-center justify-center">
              {(c.vote_average * 10).toFixed()}
              <sup>%</sup>
            </div>
          )}
          ;
        </Link>
      ))}
      ;
    </div>
  );
};

export default Cards;
