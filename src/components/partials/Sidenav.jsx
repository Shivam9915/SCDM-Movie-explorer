import React from 'react'
import { Link } from 'react-router-dom'

const Sidenav = () => {
  return (
    <div id="scroller"className=' w-[20%] h-full border-r-2 border-zinc-200 p-10'>

   <h1 className='text-2xl text-white font-bold'>
   <i class="text-[#6556cd] ri-tv-fill mr-2"></i>
   <span>SCSDB.</span>
   </h1>
   <nav className='flex flex-col text-zinc-400 text-xl gap-1'>
    <h1 className="text-white font-semibold text-xl mt-5 mb-2 ml-5">New Feeds</h1>
   

   <Link to='/trending'className='hover:bg-[#6556cd] hover:text-white duration-300 rounded-lg p-3'>
   <i class="ri-fire-fill"></i>
    Trending</Link>
    <Link to="/popular" className='hover:bg-[#6556cd] hover:text-white duration-300 rounded-lg p-3'><i class=" mr-2 ri-bard-fill"></i>
    Popular</Link>
    <Link to='/movie'className='hover:bg-[#6556cd] hover:text-white duration-300 rounded-lg p-3'><i class=" mr-2 ri-movie-2-fill"></i>
    Movies</Link>
    <Link to='/tv' className='hover:bg-[#6556cd] hover:text-white duration-300 rounded-lg p-3'><i class=" mr-2 ri-tv-2-fill"></i>
    Tv Shows</Link>
    <Link to='/people' className='hover:bg-[#6556cd] hover:text-white duration-300 rounded-lg p-3'><i class=" mr-2 ri-team-line"></i>
    People</Link>
    
    
   </nav>
   <hr className='border-none h-[1px] bg-zinc-400'/>
   <nav className='flex flex-col text-zinc-400 text-xl gap-1'>
    <h1 className="text-white font-semibold text-xl mt-5 mb-2">Website- Info</h1>
   

   <Link className='hover:bg-[#6556cd] hover:text-white duration-300 rounded-lg p-3'>
   <i class=" mr-2 ri-information-fill"></i>
    About SCSDB</Link>
    <Link className='hover:bg-[#6556cd] hover:text-white duration-300 rounded-lg p-3'><i class=" mr-2 ri-phone-fill"></i>
    Contact Us</Link>
    
    
    
   </nav>


    </div>

  )
}

export default Sidenav