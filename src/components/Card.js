import React from 'react'

const Card = ({thumbnail, onClick}) => {
  return (
    <div onClick={onClick} className='flex-shrink-0 rounded-xl bg-[#17181a] shadow-lg overflow-hidden w-[153px] h-[220px]'><img className='object-cover w-full h-full' src={thumbnail} /></div>
  )
}

export default Card