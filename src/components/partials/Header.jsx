import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({data}) => {

  return (
    <div style={{
      background:`linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.5),rgba(0,0,0,0.8)),url(http://image.tmdb.org/t/p/original/${data.poster_path || data.profile_path})`,
     backgroundPosition:"center",
     backgroundSize:"cover",
     backgroundRepeat:"no-repeat"
    }}
    className='w-full h-[60vh] flex flex-col items-start justify-end p-[5%]'>
      <h1 className='text-4xl text-white font-black'>{data.name || data.title || data.original_name || data.original_title}</h1>
      <p className='w-[70%] text-zinc-100 font-normal mt-3 font-serif'>{data.overview.slice(0,250)} ...<Link to={`/${data.media_type}/details/${data.id}`}className="text-blue-400">More</Link></p>
      <p className='text-white mt-2 '>
      
      <i class="ri-megaphone-fill text-yellow-500"></i>{data.release_date || "No information"}
      <i class="ri-album-fill text-yellow-500 ml-2"></i>{data.media_type.toUpperCase()}
        </p> 
        <Link to={`/${data.media_type}/details/${data.id}/trailer`} className='text-white font-bold bg-[#6556cd] p-3 rounded mt-5'>Watch trailer</Link>   
    </div>
  )
}

export default Header