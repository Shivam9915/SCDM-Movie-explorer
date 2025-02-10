import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncLoadtv, removetv } from "../store/actions/tvActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./partials/HorizontalCards"

const TvDetails = () => {

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.tv);
  console.log(info);

  useEffect(() => {
    dispatch(asyncLoadtv(id));
    return () => {
      dispatch(removetv());
    };
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.5),rgba(0,0,0,0.8)),url(http://image.tmdb.org/t/p/original/${
          info.detail.backdrop_path || info.detail.profile_path
        })`,
        backgroundPosition: "25%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-screen h-[180vh] px-[5%] relative overflow-y-auto"
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
              ({info.detail.first_air_date.split("-")[0]})
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
            <h1>{info.detail.first_air_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(",")}</h1>
            <h1>{info.detail.runtime}min</h1>
          </div> 
         <h1 className="text-zinc-200 font-semibold italic text-xl">
            {info.detail.tagline}
          </h1>
          <h1 className="text-2xl mt-1 text-white">overview</h1>
          <p>{info.detail.overview}</p>

          <h1 className="text-2xl mt-1 text-white">Show traslations</h1>
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
        Seasons
      </h1>
      <div className='w-[100%] flex overflow-x-auto overflow-y-hidden p-3 mb-5'>

      
      {info.detail.seasons.length > 0 ?
       info.detail.seasons.map((s,i)=>(
           <div className="w-[15vh] mr-[14%] text-white">
           <img   
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[30vh] min-w-[17vw] object-cover rounded"
            src={`http://image.tmdb.org/t/p/original/${
              s.poster_path
            }`}/>
            <h1 className="text-3xl font-black w-[30vh]">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}
          
          </h1>  
           </div>

          )):<h1 className='text-white text-3xl font-black text-center mt-5'>Nothing to show</h1>}

      </div>

      {/* {part 5 recommendations and similarities} */}
       <hr className="mt-2 mb-4 border-none h-[1px] bg-zinc-500" />
      <h1 className="text-3xl font-bold text-white">
        Recommended & Similar stuffs
      </h1>
      <HorizontalCards
        data={info.recomendation.length > 0 ? info.recomendation : info.similar}
      /> 
      
     <Outlet/>
    </div>
  ) 
  : (
    <Loading />
  );

};

export default TvDetails