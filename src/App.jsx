import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Loading from './components/Loading'
import Trending from './components/partials/Trending'
import Popular from './components/Popular'
import Movie from './components/partials/Movie'
import TvShows from './components/partials/TvShows'
import People from './components/partials/People'
import MovieDetails from './components/MovieDetails'
import PersonDetails from './components/personDetails'
import TvDetails from './components/TvDetails'
import Trailer from './components/partials/Trailer'
import Error from './components/partials/Error'

const App = () => {
  return (
    <div className=' bg-[#1F1E24] w-screen h-screen flex'>
      <Routes>
        <Route path='/'element={<Home/>}/>
       {/* <Route path='/loader' element={<Loading/>}/> */}
       <Route path='/trending' element={<Trending/>}/>
       <Route path='/popular' element={<Popular/>}/>
       <Route path='/movie' element={<Movie/>}/>
       <Route path='/movie/details/:id' element={<MovieDetails/>}>
       
       <Route path='/movie/details/:id/trailer' element={<Trailer/>}/>

       </Route>
  
       <Route path='/tv' element={<TvShows/>}/>
       <Route path='/tv/details/:id'element={<TvDetails/>}>

       <Route path='/tv/details/:id/trailer' element={<Trailer/>}/>

       </Route>
       
       <Route path='/people' element={<People/>}/>
       <Route path='/person/details/:id'element={<PersonDetails/>}/>
       <Route path='*'element={<Error/>}/>



      </Routes>
     
    </div>
  )
}

export default App