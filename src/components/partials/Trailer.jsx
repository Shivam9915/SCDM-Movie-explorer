import React from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Error from './Error'

const Trailer = () => {
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const category = pathname.includes("movie") ? "movie":"tv"
    const ytvideo = useSelector((state)=>state[category].info.videos)
    console.log(ytvideo)
  return (
    <div className='absolute top-0 left-[0] flex items-center justify-center h-screen w-screen z-[100] bg-[rgba(0,0,0,.9)]'>
         
         <Link
          onClick={() => navigate(-1)}
          class=" absolute right-[5%] top-[5%] text-3xl text-white hover:text-[#6556cd] ri-close-fill mr-4 "
        >
        </Link>
        
        {ytvideo ? ( <ReactPlayer 
        controls
       height={600}
       width={1100}
       url={`https://www.youtube.com/watch?v=${ytvideo.key}`}/> 

   ):(<Error/>)}

    </div>
  )
}

      
  


export default Trailer