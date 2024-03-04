import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import img from '../assets/Banner 2.png'
import imga from '../assets/banner 6.png'

import imgs from '../assets/banner 10.png'
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Banner = () => {
    // const { categories } = useSelector(state => state.home); // Ensure this matches your actual state structure
    const { categorys } = useSelector(state => state.home)

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };
 
    const responsiveCarousel = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 1,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    return (
        <div className='flex flex-row flex-wrap w-full bg-[#e6e0e0] md:mt-6 pl-4 pb-8'>

            <div className='w-[350px]  mt-6  md:w-1/4 lg:w-1/5 p-3 my-auto px-3'>
                {/* Categories */}
                <div className='bg-[#d9d9d9] rounded-xl overflow-hidden px-3'>
                    <div className='flex items-center justify-between p-4 font-bold text-md cursor-pointer'>
                        <span className='text-xl'>CATEGORIES</span>
                        <MdOutlineKeyboardArrowDown className='text-2xl' />
                    </div>
                    <hr />
                    <ul className='overflow-auto h-[70vh]'>
                    {categorys?.map((category, index) => (
                            <li key={index} className='flex items-center px-4 gap-4 m-2 p-2 hover:bg-[#ff5a5a] hover:font-bold hover:text-white rounded-full'>
                                {/* <img src={category.image} alt={category.name} className='w-10 h-10 rounded-full' /> */}
                                <Link to={`/products?category=${category.name}`} className='block text-lg pr-20 '>{category.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className='w-[80%] md:w-3/4 lg:w-4/5 mx-auto'>
                {/* Carousel and Slider */}
                <div className='my-8'>
                    <Carousel autoPlay={true} infinite={true} arrows={true} showDots={true} responsive={responsiveCarousel}>
                        {[1, 2, 3, 4].map((num, index) => (
                            <Link key={index} to='#' className='block h-auto w-full lg:h-[600px]'>
                                <img src={`http://localhost:3000/images/banner/${num}.jpg`} alt="" className='object-cover rounded-lg w-full h-full' />
                            </Link>
                        ))}
                    </Carousel>
                </div>

                <div className="overflow-hidden">
                    <Slider {...settings} className='mx-2'>
                        {[ imgs,img,  imga].map((image, index) => (
                            <div key={index} >
                                <img src={image} alt="Slide" className=' h-[250px] w-[650px] rounded-xl object-cover' />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default Banner;


// import React, { useState } from 'react'
// import Carousel from 'react-multi-carousel'
// import 'react-multi-carousel/lib/styles.css'
// import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
// import { Link } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import img from '../assets/4.jpg'
// // import React, { Component } from "react";
// import Slider from "react-slick";

// const Banner = () => {

//     const settings = {
//         dots: true,
//         infinite: true,
//         slidesToShow: 3,
//         slidesToScroll: 1,
//         autoplay: false,
//         speed: 2000,
//         autoplaySpeed: 2000,
//         cssEase: "linear"
//     };



//     const { categorys } = useSelector(state => state.home)
//     const responsive = {
//         superLargeDesktop: {
//             breakpoint: { max: 4000, min: 3000 },
//             items: 1
//         },
//         desktop: {
//             breakpoint: { max: 3000, min: 1024 },
//             items: 1
//         },
//         tablet: {
//             breakpoint: { max: 1024, min: 464 },
//             items: 1
//         },
//         mobile: {
//             breakpoint: { max: 464, min: 0 },
//             items: 1
//         }
//     }
//     return (
//         <div className='w-full bg-[#e6e0e0] md-lg:mt-6 pl-4 pb-8  flex'>

//             <div className=' w-[20%] my-8 m-3'>
//                 <div className=''>
//                     <div className=' relative'>
//                         <div  className='h-[50px] rounded-t-xl bg-[#d9d9d9] flex  px-10 md-lg:justify-between md-lg:px-6 items-center gap-3 font-bold text-md cursor-pointer'>
//                             <div className="flex gap-3 text-xl text"> 
//                                 <span>CATEGORIES</span>
//                             </div>
//                             <span className='pt-1'><MdOutlineKeyboardArrowDown /></span>
//                         </div>
//                         <hr/>
//                         <div className={`h-[70vh] overflow-hidden   rounded-b-lg md-lg:relative duration-500 absolute bg-[#d9d9d9] w-full border-x`}>
//                             <ul className='py-2 font-medium h-full overflow-auto'>
//                                 {
//                                     categorys.map((c, i) => {
//                                         return (
//                                             <li key={i} className=' m-2 flex justify-start  hover:bg-white cursor-pointer rounded-full items-center gap-4 px-[24px] py-[6px]'>
//                                                 <img src={c.image} className='w-[40px] h-[40px] rounded-full bg-[pink] overflow-hidden' alt={c.name} />
//                                                 <Link to={`/products?category=${c.name}`} className='text-lg  block'>{c.name}</Link>
//                                             </li>
                                            
//                                         )
//                                     })
//                                 }
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className='w-[75%] lg:w-[90%] mx-auto  '>
//                 <div className='w-full flex flex-wrap md-lg:gap-8'>
//                     <div className='w-full'>
//                         <div className='my-8'>
//                             <Carousel
//                                 autoPlay={true}
//                                 infinite={true}
//                                 arrows={true}
//                                 showDots={true}
//                                 responsive={responsive}
//                             >
//                                 {
//                                     [1, 2, 3, 4].map((img, i) => <Link className='lg-md:h-[500px] h-auto w-full block' key={i} to='#'>
//                                         <img className='object-cover rounded-lg' src={`http://localhost:3000/images/banner/${img}.jpg`} alt="" />
//                                     </Link>)
//                                 }
//                             </Carousel>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="slider-container rounded-3xl">
//                     <Slider {...settings}>
                    
//                             <div >
//                                 <img className='items-center object-cover rounded-lg ' src={img} alt="images" />
//                             </div>
                       
                        
//                             <div>
//                                 <img className='items-center object-cover rounded-lg' src={img} alt="images" />
//                             </div>
                        
//                             <div>
//                                 <img className='items-center object-cover rounded-lg ' src={img} alt="images" />
//                             </div>
//                     </Slider>
//                 </div>

//             </div>
//         </div>
//     )
// }

// export default Banner