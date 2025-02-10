import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Topnav from './Topnav'
import Dropdown from './Dropdown'
import axios from "../../utils/axios"
import Cards from './Cards'
import Loading from '../Loading'
import InfiniteScroll from 'react-infinite-scroll-component'

const Trending = () => {
    const navigate=useNavigate()
    const [category, setCategory] = useState("all")
    const [duration, setDuration] = useState("day")
    const [trending, setTrending] = useState([])
    const [page, setPage] = useState("1");
    const [hasmore, setHasmore] = useState(true)


    const getTrending = async () => {
        try {
          const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
          if(data.results.length>0){
              setTrending((prev)=>[...prev,...data.results])
              setPage(page+1)
          }
          else{
            setHasmore(false)
          }
    
        } catch (err) {
          console.log("Error" + err);
        }
    };

    const refresHandler=()=>{
        if(trending.length===0){
            getTrending();
        }
        else{
            setPage(1);
            setTrending([]);
            getTrending()
        }
    }
    
    
    useEffect(() => {
       refresHandler();
    }, [category,duration])
    console.log(trending)



    
  return trending ? (
    <div className='h-screen w-screen'>
        <div className='w-full flex items-center justify-between px-[3%] mt-5 pr-24'>
            <h1 className='text-2xl font-semibold text-zinc-400'>
            <i onClick={()=>navigate(-1)} class=" hover:text-[#6556cd] ri-arrow-left-line mr-4"></i>
            Trending
            </h1>
            <Topnav/>
            <Dropdown title="Category" options={["tv", "movie", "all","person"]} func={(e)=>setCategory(e.target.value)}/>
            <Dropdown title="Duration" options={["weekly","day"]} func={(e)=>setDuration(e.target.value)}/>

        </div>
            <InfiniteScroll dataLength={trending.length}loader={<h1>Loading....</h1>} next={getTrending} hasMore={hasmore}>
            <Cards data={trending} title={category} />
            </InfiniteScroll>
        
    </div>
  ):<Loading/>
}

export default Trending