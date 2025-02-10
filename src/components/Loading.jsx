import React from 'react'
import loader from "/loading.gif"

const Loading = () => {
  return (
    <div>
        <img className=' h-screen w-screen  object-cover' src={loader}alt=''></img>
    </div>
  )
}

export default Loading