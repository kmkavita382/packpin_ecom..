import React from 'react'
import img from '../assets/shop.png'

const Bulk = () => {
  return (
    <div className='h-[817px] w-[815] items-center justify-center  ml-[30%] mt-40 border-red-500 ' >

    <form className="w-full max-w-2xl">
      <div className=' text-center mb-4'>
        <div className=' md:w-1/3 px-3 ml-[250px]  md:mb-0  h-[128px] w-[128px] ' ><img src={img} alt="" /></div>
        <span className='text-center text-[29px] font-bold '>Get the best quotes for <br />  Bulk Orders</span> <br />
        <span className=' text-[13px] '>Fill your bulk query requirements, <br /> Our experts will get in touch with you with the best - all of this within 30min. </span>
      </div>

      <div className="flex flex-wrap-mx-3">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide  text-xs font-bold mb-2" for="grid-first-name">
            Name
          </label>
          <input className="border-red-500 appearance-none block w-full  text-gray-700 border  rounded-2xl py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
            Mobile Number
          </label>
          <input className="border-red-500 appearance-none block w-full  text-gray-700 border  rounded-2xl py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" />
        </div>
      </div>
      <div className="flex flex-wrap-mx-3">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide  text-xs font-bold mb-2" for="grid-first-name">
            Name
          </label>
          <input className="border-red-500 appearance-none block w-full  text-gray-700 border  rounded-2xl py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
            Mobile Number
          </label>
          <input className="border-red-500 appearance-none block w-full  text-gray-700 border  rounded-2xl py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" />
        </div>
      </div>
      <div className="flex flex-wrap-mx-3">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide  text-xs font-bold mb-2" for="grid-first-name">
            Name
          </label>
          <input className="border-red-500 appearance-none block w-full  text-gray-700 border  rounded-2xl py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
            Mobile Number
          </label>
          <input className="border-red-500 appearance-none block w-full  text-gray-700 border  rounded-2xl py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" />
        </div>
      </div>
      
      <button class=" bg-red-500 hover:bg-green-500 text-white hover:text-black font-bold py-2 w-full rounded-2xl focus:outline-none focus:shadow-outline text-19  " type="button">
        Submit
      </button>

    </form>
    
  </div>
    
  )
}

export default Bulk
