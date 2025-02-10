import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "../../utils/axios"
import InfiniteScroll from 'react-infinite-scroll-component'
import Cards from './Cards'
import Dropdown from './Dropdown'
import Topnav from './Topnav'
import Loading from '../Loading'


const TvShows = () => {
    const navigate=useNavigate()
    const [category, setCategory] = useState("airing_today")
    const [tv, setTv] = useState([])
    const [page, setPage] = useState("1");
    const [hasmore, setHasmore] = useState(true)
    document.title = "SCSDB  |  Popular"



    
    const getTvshow = async () => {
        try {
          const { data } = await axios.get(`/tv/${category}?page=${page}`);
          console.log(data)
          if(data.results.length>0){
              setTv((prev)=>[...prev,...data.results])
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
        if(tv.length===0){
            getTvshow();
        }
        else{
            setPage(1);
            setTv([]);
            getTvshow()
        }
    }
    
    
    useEffect(() => {
       refresHandler();
    }, [category])
    console.log(tv)


    
  return  tv.length > 0 ? (
    <div className='h-screen w-screen'>
        <div className='w-full flex items-center justify-between px-[3%] mt-8 pr-24'>
            <h1 className='flex text-2xl font-semibold text-zinc-400 ml-4 bg-slate-50 w-[34vw] rounded'>
            <i onClick={()=>navigate(-1)} class=" hover:text-[#6556cd] ri-arrow-left-line mr-4"></i>
            Tv-Shows <small className='ml-2'>({category})</small>
            </h1>
            <Topnav/>
          
            <Dropdown title="Category" options={["airing_today","on_the_air","popular", "top_rated"]} func={(e)=>setCategory(e.target.value)}/>

        </div>
            <InfiniteScroll dataLength={tv.length}loader={<h1>Loading....</h1>} next={getTvshow} hasMore={hasmore}>
            <Cards data={tv} title="tv" />
        
            </InfiniteScroll>
            
            
        
    </div>
  ):<Loading/>
  
  
}



export default TvShows