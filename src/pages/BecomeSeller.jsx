import React from 'react'
import img from '../assets/business building.png'

const BecomeSeller = () => {
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
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
              Email ID
            </label>
            <input className="border-red-500 appearance-none block w-full  text-gray-700 border  rounded-2xl py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque" />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
              Product type
            </label>
            <div className="relative border-red-500">
              <select className=" border-red-500 block appearance-none w-full  border text-gray-700 py-3 px-4 pr-8 rounded-2xl leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                <option>New Mexico</option>
                <option>Missouri</option>
                <option>Texas</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
              Quantity
            </label>
            <input className="border-red-500 appearance-none block w-full  text-gray-700 border rounded-2xl py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210" />
          </div>
        </div>
        <div className="flex flex-wrap-mx-3 mb-6">
          <div className="w-full px-3">
            <legend className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
              Remark
            </legend>
            <textarea className= "  border-red-500 appearance-none block w-full h-[117px]  text-gray-700 border rounded-2xl py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="Remark" />
          </div>
        </div>
        <button class=" bg-red-500 hover:bg-green-500 text-white hover:text-black font-bold py-2 w-full rounded-2xl focus:outline-none focus:shadow-outline text-19  " type="button">
          Submit
        </button>

      </form>
      
    </div>
    // sshdfsdhfjdhjkdfg

   
  )
}

export default BecomeSeller
