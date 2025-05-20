import React from 'react'

interface Props {
    videoUrl:string;
}

export default function VideoCourse({videoUrl}:Props) {
  return (
    <video src={videoUrl} controls className='w-full rounded-md shadow-md'>
      
    </video>
  )
}
