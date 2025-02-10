import React from 'react'
import error from "/404.jfif"

const Error = () => {
  return (
    <div>
        <img className=' h-screen w-screen  object-cover' src={error}alt=''></img>
    </div>
  )
}

export default Error