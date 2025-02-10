import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../utils/axios'
import noimage from '/noimage.png'

const Topnav = () => {
  const [query, setQuery] = useState("")
  const [searches, setSearches] = useState([])
  
  const GetSearches= async()=>{
    try {
      const {data}=await axios.get(`/search/multi?query=${query}`)
      // console.log(data);
      setSearches(data.results)      
    
      
      
    } catch (err) {
      console.log("Error"+err)
      
    }
  
  };
  // console.log(searches)

useEffect(() => {
    GetSearches();

}, [query])



  return (
    <div className='w-full h-[10vh] flex justify-center items-center relative'>
        <i class=" text-zinc-400 text-3xl ri-search-line"></i>
        <input onChange={(e)=>setQuery(e.target.value)} value={query}className='w-[50%] mx-10 p-5 text-xl text-white outline-none border-none bg-transparent' type="text"placeholder='Search anything' />
       {/* condition to display cross */}
        {query.length>0 &&(
        <i onClick={()=>setQuery("")} class=" text-zinc-400 text-3xl ri-close-line"></i>
        )
       }
        <div className='z-[100] absolute w-[59%] max-h-[28vh] bg-zinc-200 top-[100%] overflow-y-auto rounded '>

          {searches.map((s, i) => (
            <Link to={`/${s.media_type}/details/${s.id}`}key={i} className='w-[100%] text-zinc-600 bg-zinc-400 p-10 flex justify-start items-center hover:text-black hover:bg-zinc-300 duration-300 font-semibold border-b-2 border-zinc-100'>
            <img className='h-[13vh] w-[13vh] object-cover mr-10 rounded shadow-lg'src={s.profile_path || s.poster_path ? `http://image.tmdb.org/t/p/original/${s.poster_path || s.profile_path }`:noimage} alt=""/>
            <span>{s.name || s.title || s.original_name || s.original_title}</span>
            </Link>

         ))} 
            {/* <Link className='w-[100%] text-zinc-600 bg-zinc-200 p-10 flex justify-start items-center hover:text-black hover:bg-zinc-300 duration-300 font-semibold border-b-2 border-zinc-100'>
            <img src=""alt=""></img>
            <span> Hello Everyone !</span>
            </Link> */}
           
            

        </div>
    </div>
  )
}

export default Topnav