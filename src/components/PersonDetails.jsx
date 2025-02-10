import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncLoadperson, removeperson } from "../store/actions/personActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";

const PersonDetails = () => {
  const [category, setCategory] = useState("movie")
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { info } = useSelector((state) => state.person);
  console.log(info);

  useEffect(() => {
    dispatch(asyncLoadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);

  return info ? (
    <div className="w-screen px-[10%] h-[200vh] bg-[#1f1e24]">
      <nav className="w-full h-[10vh] text-zinc-100 flex items-center gap-x-10 text-xl rounded-md">
        <Link
          onClick={() => navigate(-1)}
          class=" hover:text-[#6556cd] ri-arrow-left-line mr-4 "
        ></Link>

      </nav>

      <div className="w-full flex">
        {/* part 2 left poster and details */}
        <div className="w-[20%]">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[35vh] object-cover rounded"
            src={`http://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
          />
          <hr className="mt-4 mb-4 border-none h-[1px] bg-zinc-500" />

          {/* social media links */}
          <div className="text-white flex gap-x-5 text-xl">
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              {" "}
              <i class=" hover:text-[#6556cd] ri-earth-fill"></i>
            </a>

            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              {" "}
              <i class=" hover:text-[#6556cd] ri-facebook-circle-fill"></i>
            </a>

            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              {" "}
              <i class=" hover:text-[#6556cd] ri-instagram-line"></i>
            </a>

            <a
              target="_blank"
              href={`https://www.twitter.com/${info.externalid.twitter_id}`}
            >
              {" "}
              <i class=" hover:text-[#6556cd] ri-twitter-fill"></i>
            </a>
          </div>
          {/* personal information */}
          <h1 className="text-xl text-zinc-400 font-semibold my-3">
            Person Information
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold">Known for</h1>
          <h1 className="text-zinc-400">{info.detail.known_for_department}</h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Gender</h1>
          <h1 className="text-zinc-400">
            {info.detail.gender == 2 ? "Male" : "Female"}
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Birthday</h1>
          <h1 className="text-zinc-400">{info.detail.birthday}</h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Deathday</h1>
          <h1 className="text-zinc-400">
            {info.detail.deathday ? info.detail.deathday : "Still alive"}
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">
            Place of birth
          </h1>
          <h1 className="text-zinc-400">{info.detail.place_of_birth}</h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Deathday</h1>
          <h1 className="text-zinc-400">
            {info.detail.deathday ? info.detail.deathday : "Still alive"}
          </h1>
        </div>

        {/* right part information and detail */}
        <div className="w-[80%] ml-[5%]">
          <h1 className="text-5xl text-zinc-400 font-black my-2">
            {info.detail.name}
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold">Biography</h1>
          <p className=" mt-3 text-zinc-400">{info.detail.biography}</p>
          <h1 className="text-zinc-400">{info.detail.known_for_department}</h1>

          <h1 className="text-lg mt-2 text-zinc-400 font-semibold">Summary</h1>
          <HorizontalCards data={info.combinedcredits.cast}/>

          <div className="w-full flex justify-between">
          <h1 className="text-xl text-zinc-400 font-semibold">Acting</h1>

            <Dropdown title={category} options={["movies","tv"]} func={(e)=>(setCategory(e.target.value))}/>
          </div>
          <div className="w-full h-[40vh] p-5 list-disc text-zinc-400 mt-5 overflow-x-hidden overflow-y-auto shadow-lg shadow-[rgba(255,255,255,.5)] border border-zinc-700">
               {info[category + "credits"].cast.map((c,i)=>(
                             <li className="hover:text-white duration-300 rounded bg-[#19191d] cursor-pointer">
                             <Link key={i} to={`/${category}/details/${c.id}`} className="">
                             <span className="">
                           { c.name ||
                            c.title ||
                            c.original_name ||
                            c.original_title }                               
                             </span>
                             <span className="block mb-3">{c.character && `Character Name : ${c.character}`}</span>
                             </Link>
                            </li>
               ))}
          </div>

        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetails;
