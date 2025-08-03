import React from 'react'

const Navbar = () => {
  return (
   <nav className='bg-slate-800 flex justify-between items-center p-4 max-h-14 text-white'>
    <div className="logo font-bold text-2xl">
        <span className='text-green-700'>&lt;/</span>
        <span className="">Pass</span>
        <span className='text-green-700'>Keep/&gt;</span>
        </div>
   <button className="git flex hover:font-bold bg-slate-200 rounded-full p-2 px-3 ">
    <img className=' w-8' src="/icons/github.svg" alt="github" />
   <p className='mt-1 ml-2 text-black '>Github</p> 
   </button>
   </nav>
  )
}

export default Navbar
