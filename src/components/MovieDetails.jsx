import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncLoadmovie, removemovie } from "../store/actions/movieActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./partials/HorizontalCards"

const MovieDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.movie);
  console.log(info);

  useEffect(() => {
    dispatch(asyncLoadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.5),rgba(0,0,0,0.8)),url(http://image.tmdb.org/t/p/original/${
          info.detail.poster_path || info.detail.profile_path
        })`,
        backgroundPosition: "40%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-screen h-[180vh] px-[5%] relative"
    >
      {/* part 1 navigation */}
      <nav className="w-full h-[10vh] flex items-center gap-x-10 text-xl rounded-md">
        <Link
          onClick={() => navigate(-1)}
          class=" hover:text-[#6556cd] ri-arrow-left-line mr-4 "
        ></Link>
        <a target="_blank" href={info.detail.homepage}>
          <i class=" hover:text-[#6556cd] ri-external-link-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          {" "}
          <i class=" hover:text-[#6556cd] ri-earth-fill"></i>
        </a>
        <a
          className="hover:text-[#6556cd]"
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
        >
          imdb
        </a>
      </nav>

      {/* part 2 poster and details */}

      <div className="flex w-full mt-[5%] ml-[5%] mb-[3%]">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[60vh] object-cover rounded"
          src={`http://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
        />

        <div className="content ml-[5%] text-white">
          <h1 className="text-5xl font-black">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}
            <small className="text-xl text-zinc 300">
              ({info.detail.release_date.split("-")[0]})
            </small>
          </h1>

          <div className="flex items-center text-white gap-x-5 mt-3 mb-3">
            <span className=" text-white h-[5vh] w-[5vh] rounded-full bg-yellow-700 flex items-center justify-center">
              {(info.detail.vote_average * 10).toFixed()}
              <sup>%</sup>
            </span>

            <h1 className="text-2xl font-semibold w-[60px] leading-6">
              user score
            </h1>
            <h1>{info.detail.release_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(",")}</h1>
            <h1>{info.detail.runtime}min</h1>
          </div>

          <h1 className="text-zinc-200 font-semibold italic text-xl">
            {info.detail.tagline}
          </h1>
          <h1 className="text-2xl mt-1 text-white">overview</h1>
          <p>{info.detail.overview}</p>

          <h1 className="text-2xl mt-1 text-white">Movie traslations</h1>
          <p className="mb-10">{info.translation.join(", ")}</p>

          <Link
            to={`${pathname}/trailer`}
            className="p-5 bg-[#6556cd] rounded-lg"
          >
            <i class=" text-xl mr-3 ri-play-fill"></i>
            Play trailer
          </Link>
        </div>
      </div>

      {/* part 3 available on platforms */}
      {/* 
      <div className="mt-1 ml-[5%]">
         {info.watchprovider && info.watchprovider.rent && info.watchprovider.rent.map(w=>(
           <img className="w-[5vh] h-[5vh] object-cover rounded" src={`http://image.tmdb.org/t/p/original/${
            w.logo_path
          }`} />
        )) }

        
      </div> */}

      {/* {part 4 recommendations and similarities} */}
      <hr className="mt-2 mb-4 border-none h-[1px] bg-zinc-500" />
      <h1 className="text-3xl font-bold text-white">
        Recommended & Similar stuffs
      </h1>
      <HorizontalCards
        data={info.recomendation.length > 0 ? info.recomendation : info.similar}
      />
     <Outlet/>
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;
