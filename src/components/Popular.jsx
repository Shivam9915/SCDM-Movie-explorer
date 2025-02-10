import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "../utils/axios"
import InfiniteScroll from 'react-infinite-scroll-component'
import Cards from './partials/Cards'
import Topnav from './partials/Topnav'
import Dropdown from './partials/Dropdown'
import Loading from './Loading'

const Popular = () => {

    const navigate=useNavigate()
    const [category, setCategory] = useState("movie")
    const [popular, setPopular] = useState([])
    const [page, setPage] = useState("1");
    const [hasmore, setHasmore] = useState(true)
    document.title = "SCSDB  |  Popular"


    
    const getPopular = async () => {
      try {
        const { data } = await axios.get(`${category}/popular?page=${page}`);
        console.log(data)
        if(data.results.length>0){
            setPopular((prev)=>[...prev,...data.results])
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
      if(popular.length===0){
          getPopular();
      }
      else{
          setPage(1);
          setPopular([]);
          getPopular()
      }
  }
  
  
  useEffect(() => {
     refresHandler();
  }, [category])
  console.log(popular)






  return popular ? (
    <div className='h-screen w-screen'>
        <div className='w-full flex items-center justify-between px-[3%] mt-8 pr-24'>
            <h1 className='text-2xl font-semibold text-zinc-400 ml-9'>
            <i onClick={()=>navigate(-1)} class=" hover:text-[#6556cd] ri-arrow-left-line mr-4"></i>
            Popular
            </h1>
            <Topnav/>
          
            <Dropdown title="Category" options={["tv", "movie"]} func={(e)=>setCategory(e.target.value)}/>

        </div>
            <InfiniteScroll dataLength={popular.length}loader={<h1>Loading....</h1>} next={getPopular} hasMore={hasmore}>
            <Cards data={popular} />
        
            </InfiniteScroll>
            
        
    </div>
  ):<Loading/>
  
}

export default Popular