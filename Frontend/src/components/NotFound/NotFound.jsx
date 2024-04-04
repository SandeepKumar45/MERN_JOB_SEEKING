import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className='pt-32 xl:pt-0 min-h-[750px]'>
      <div className="flex flex-col items-center">
        <img src="/notfound.png" alt="notfound" />
        <Link to={'/'} className='text-xl font-medium border text-[#184235] px-[30px] py-[7px] bg-transparent hover:bg-[#184235] hover:transition-all hover:duration-[0.3s] hover:text-[#f1f3f6]'>RETURN TO HOME PAGE</Link>
      </div>
    </section>
  )
}

export default NotFound