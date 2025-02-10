import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "../../utils/axios"
import InfiniteScroll from 'react-infinite-scroll-component'
import Cards from './Cards'
import Dropdown from './Dropdown'
import Topnav from './Topnav'
import Loading from '../Loading'

const Movie = () => {

    const navigate=useNavigate()
    const [category, setCategory] = useState("top_rated")
    const [movie, setMovie] = useState([])
    const [page, setPage] = useState("1");
    const [hasmore, setHasmore] = useState(true)
    document.title = "SCSDB  |  Popular"



    
    const getMovie = async () => {
        try {
          const { data } = await axios.get(`/movie/${category}?page=${page}`);
          console.log(data)
          if(data.results.length>0){
              setMovie((prev)=>[...prev,...data.results])
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
        if(movie.length===0){
            getMovie();
        }
        else{
            setPage(1);
            setMovie([]);
            getMovie()
        }
    }
    
    
    useEffect(() => {
       refresHandler();
    }, [category])
    console.log(movie)



  return  movie.length > 0 ? (
    <div className='h-screen w-screen'>
        <div className='w-full flex items-center justify-between px-[3%] mt-8 pr-24'>
            <h1 className='text-2xl font-semibold text-zinc-400 ml-9'>
            <i onClick={()=>navigate(-1)} class=" hover:text-[#6556cd] ri-arrow-left-line mr-4"></i>
            Movies
            </h1>
            <Topnav/>
          
            <Dropdown title="Category" options={["now_playing","top_rated","popular", "upcoming"]} func={(e)=>setCategory(e.target.value)}/>

        </div>
            <InfiniteScroll dataLength={movie.length}loader={<h1>Loading....</h1>} next={getMovie} hasMore={hasmore}>
            <Cards data={movie} title="movie" />
        
            </InfiniteScroll>
            
            
        
    </div>
  ):<Loading/>
  
  
}
export default Movie