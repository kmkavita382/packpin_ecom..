import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaFacebookF, FaLinkedin } from 'react-icons/fa'
import { AiFillGithub, AiOutlineTwitter } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { AiFillShopping, AiFillHeart } from 'react-icons/ai'

const Footer = () => {

    const { card_product_count, wishlist_count } = useSelector(state => state.card)
    const navigate = useNavigate()
    const { userInfo } = useSelector(state => state.auth)


    return (
        <footer className='bg-[#F3F6Fa]'>
            <div className='w-[90%] flex flex-wrap mx-auto border-b py-16 md-lg:pb-10 sm:pb-6 flex-col'>
                <div className='sm:w-full flex  mb-3 pb-5 place-content-between '>
                    <div className=''>
                        <img className='w-[190px] h-[70x]' src="http://localhost:3000/images/logo.png" alt="logo" />
                    </div>
                    <div className=''>
                        <button className='border border-black px-[50px] py-2 rounded-full hover:border-none font-bold hover:bg-red-500 hover:text-white' >Contact Us</button>
                    </div>
                </div>

                <hr />

                <div className='flex mt-8 place-content-between'>
                    <div className='lg:w-8/12 sm-md:flex-row '>
                        <div className='flex justify-center sm:justify-start sm:mt-6 w-full'>
                            <div>
                                <h2 className='font-bold text-lg mb-2'>Product</h2>
                                <div className='flex justify-between gap-[80px] lg:gap-[40px]'>
                                    <ul className='flex flex-col gap-2 text-slate-600 text-sm'>
                                        <li>
                                            <Link>Landing Page</Link>
                                        </li>
                                        <li>
                                            <Link>Poup Builder</Link>
                                        </li>
                                        <li>
                                            <Link>Web-Design</Link>
                                        </li>
                                        <li>
                                            <Link>Content</Link>
                                        </li>
                                        <li>
                                            <Link>Integration</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='lg:w-8/12 '>
                        <div className='flex justify-center sm:justify-start sm:mt-6 w-full'>
                            <div>
                                <h2 className='font-bold text-lg mb-2'>Use Cases</h2>
                                <div className='flex justify-between gap-[80px] lg:gap-[40px]'>
                                    <ul className='flex flex-col gap-2 text-slate-600 text-sm'>
                                        <li>
                                            <Link>Web-designers</Link>
                                        </li>
                                        <li>
                                            <Link>Marketers</Link>
                                        </li>
                                        <li>
                                            <Link>Small Bussiness</Link>
                                        </li>
                                        <li>
                                            <Link>Website Builder</Link>
                                        </li>
                                        <li>
                                            <Link>Support</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='lg:w-8/12 sm:w-full'>
                        <div className='flex justify-center sm:justify-start sm:mt-6 w-full'>
                            <div>
                                <h2 className='font-bold text-lg mb-2'>Resources</h2>
                                <div className='flex justify-between gap-[80px] lg:gap-[40px]'>
                                    <ul className='flex flex-col gap-2 text-slate-600 text-sm'>
                                        <li>
                                            <Link>Academy</Link>
                                        </li>
                                        <li>
                                            <Link>Blog</Link>
                                        </li>
                                        <li>
                                            <Link>Themes</Link>
                                        </li>
                                        <li>
                                            <Link>Hosting</Link>
                                        </li>
                                        <li>
                                            <Link>Developers</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='lg:w-8/12 sm:w-full'>
                        <div className='flex justify-center sm:justify-start sm:mt-6 w-full'>
                            <div>
                                <h2 className='font-bold text-lg mb-2'>Company</h2>
                                <div className='flex justify-between gap-[80px] lg:gap-[40px]'>
                                    <ul className='flex flex-col gap-2 text-slate-600 text-sm'>
                                        <li>
                                            <Link>About Us</Link>
                                        </li>
                                        <li>
                                            <Link>Careers</Link>
                                        </li>
                                        <li>
                                            <Link>FAQs</Link>
                                        </li>
                                        <li>
                                            <Link>Thems</Link>
                                        </li>
                                        <li>
                                            <Link>Contact Us</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='lg:w-full lg:mt-6 ml-[500px]'>
                        <div className='w-full flex flex-col justify-start gap-3'>
                            <h2 className='font-bold text-lg mb-2' >
                                <Link>Follow us</Link>
                            </h2>

                            <ul className='flex justify-start items-center gap-3'>
                                <li>
                                    <a className='w-[38px] h-[38px] hover:bg-red-500 hover:text-white flex justify-center items-center bg-white rounded-full' href="#"><FaFacebookF /></a>
                                </li>
                                <li>
                                    <a className='w-[38px] h-[38px] hover:bg-red-500 hover:text-white flex justify-center items-center bg-white rounded-full' href="#"><AiOutlineTwitter /></a>
                                </li>
                                <li>
                                    <a className='w-[38px] h-[38px] hover:bg-red-500 hover:text-white flex justify-center items-center bg-white rounded-full' href="#"><FaLinkedin /></a>
                                </li>
                                <li>
                                    <a className='w-[38px] h-[38px] hover:bg-red-500 hover:text-white flex justify-center items-center bg-white rounded-full' href="#"><AiFillGithub /></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className='mt-[150px]'/>
                <div className='w-[90%] flex flex-wrap  text-slate-600 place-content-between pt-5'>
                    <span>Copiright ©2023 All rights reserved</span>
                    <div>
                        <ul className='flex space-x-4 text-lg'>
                            <li>
                                <a href="#">Provarcy Policy</a>
                            </li>
                            <li>
                                <a href="#">Terms of Use</a>
                            </li>
                            <li>
                                <a href="#">Sales and Refunds</a>
                            </li>
                            <li>
                                <a href="#">Leagal</a>
                            </li>
                            <li>
                                <a href="#">Site Map</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>




            {/* <div className='hidden fixed md-lg:block w-[50px] bottom-3 h-[110px] right-2 bg-white rounded-full p-2'>
                <div className='w-full h-full flex gap-3 flex-col justify-center items-center'>
                    <div onClick={() => navigate(userInfo ? '/card' : '/login')} className='relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'>
                        <span className='text-xl text-orange-500'><AiFillShopping /></span>
                        {
                            card_product_count !== 0 && <div className='w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]'>
                                {
                                    card_product_count
                                }
                            </div>
                        }
                    </div>
                    <div onClick={() => navigate(userInfo ? '/dashboard/my-wishlist' : '/login')} className='relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'>
                        <span className='text-xl text-red-500'><AiFillHeart /></span>
                        {
                            wishlist_count !== 0 && <div className='w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]'>
                                {wishlist_count}
                            </div>
                        }
                    </div>
                </div>
            </div> */}
        </footer>
    )
}

export default Footer