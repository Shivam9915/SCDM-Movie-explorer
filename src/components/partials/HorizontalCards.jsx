import React from 'react'
import Dropdown from './Dropdown'
import { Link } from 'react-router-dom'
import noimage from '/noimage.png'

const HorizontalCards = ({data}) => {
  return (
    
    
    <div className='w-[100%] h-[64vh] flex overflow-x-auto overflow-y-hidden p-3 mb-10 mt-4'>


        {data.length > 0 ? data.map((d,i)=>(
          <Link to={`/${d.media_type}/details/${d.id}`} 
          key={i}
           className='min-w-[25%] h-[60vh] mr-5 bg-zinc-900'>

            <img className='w-full h-[50%] object-cover bg-top rounded'src={d.poster_path || d.poster_path ?`http://image.tmdb.org/t/p/original/${d.poster_path || d.poster_path}`:noimage} alt="" />
          <div className='text-white p-3'>
          <h1 className='text-xl font-semibold mt-1'>{d.title || d.name || d.original_title || d.original_name}</h1>
            <p className=' font-medium mt-2'>{d.overview.slice(0,100)} <span className='text-zinc-500'>...More</span></p>

          </div>
          </Link>
        
        )):<h1 className='text-white text-3xl font-black text-center mt-5'>Nothing to show</h1>}
    </div>
    
    
  )
}

export default HorizontalCards