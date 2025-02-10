import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "../../utils/axios"
import InfiniteScroll from 'react-infinite-scroll-component'
import Cards from './Cards'
import Dropdown from './Dropdown'
import Topnav from './Topnav'
import Loading from '../Loading'


const People = () => {


  const navigate=useNavigate()
    const [category, setCategory] = useState("popular")
    const [people, setPeople] = useState([])
    const [page, setPage] = useState("1");
    const [hasmore, setHasmore] = useState(true)
    document.title = "SCSDB  |  People"



    
    const getPerson = async () => {
        try {
          const { data } = await axios.get(`/person/${category}?page=${page}`);
          console.log(data)
          if(data.results.length>0){
              setPeople((prev)=>[...prev,...data.results])
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
        if(people.length===0){
            getPerson();
        }
        else{
            setPage(1);
            setPeople([]);
            getPerson()
        }
    }
    
    
    useEffect(() => {
       refresHandler();
    }, [category])
    console.log(people)



  return  people.length > 0 ? (
    <div className='h-screen w-screen'>
        <div className='w-full flex items-center justify-between px-[3%] mt-8 pr-24'>
            <h1 className='text-2xl font-semibold text-zinc-400 ml-4 bg-slate-50 w-[20vw] rounded flex items-center'>
            <i onClick={()=>navigate(-1)} class=" hover:text-[#6556cd] ri-arrow-left-line mr-4 text-red-300"></i>
            People <small className='ml-2'>({category})</small>
            </h1>
            <Topnav/>
          
        </div>
            <InfiniteScroll dataLength={people.length}loader={<h1>Loading....</h1>} next={getPerson} hasMore={hasmore}>
            <Cards data={people} title="person" />
        
            </InfiniteScroll>
            
            
        
    </div>
  ):<Loading/>
  
  
}

export default People