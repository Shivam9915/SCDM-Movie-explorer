import React, { useState, useEffect } from "react";
import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";
import axios from "../utils/axios";
import Header from "./partials/Header";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";
import Loading from "./Loading";
import MovieDetails from "./MovieDetails";

const Home = () => {
  document.title = "SCDB | HomePage";
  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCategory] = useState("tv")


  const getHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);

      let randomData =
        data.results[(Math.random() * data.results.length).toFixed()];
      //  console.log(data)
      setWallpaper(randomData);
    } catch (err) {
      console.log("Error" + err);
    }
  };

  // trending method.......................

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results);
    } catch (err) {
      console.log("Error" + err);
    }
  };
//  console.log(trending)



  useEffect(() => {
    getTrending();
    !wallpaper && getHeaderWallpaper();
  }, [category]);
  // console.log(category);

  return wallpaper && trending ? (
    <>
      <Sidenav />
      <div className="w-[80%] h-full overflow-y-auto">
        <Topnav />
        <Header data={wallpaper} />

        <div className="p-4 flex justify-between">
          <h1 className="text-3xl font-semibold text-zinc-200">Trending</h1>
          <Dropdown title="Filter" options={["tv", "movies", "all","person"]} func={(e)=>setCategory(e.target.value)}/>
        </div>

        <HorizontalCards data={trending} />
      </div>
      
       
    </>
  ) : (
       <Loading/>
  );
};

export default Home;
