import React from 'react'
import Loading from './Loading'

const Card = ({thumbnail, onClick, loading}) => {
  return (
    <div onClick={onClick} className='relative flex items-center justify-center flex-shrink-0 rounded-xl bg-[#17181a] shadow-lg overflow-hidden w-[153px] h-[220px]'>
      <img className='object-cover w-full h-full' src={thumbnail} />
      {loading && <div className='absolute'><Loading size={20}/></div>}
      </div>
  )
}

export default Card