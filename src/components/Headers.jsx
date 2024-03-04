import React, { useEffect, useState } from 'react'
import { IoMdSearch } from 'react-icons/io'
import { FaUser, FaLock, FaList } from 'react-icons/fa'
import { AiFillHeart } from 'react-icons/ai'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { get_card_products, get_wishlist_products } from '../store/reducers/cardReducer'
import { FaCartArrowDown, FaStore } from "react-icons/fa6";
import { MdLibraryBooks } from "react-icons/md";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GradingIcon from '@mui/icons-material/Grading';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HelpIcon from '@mui/icons-material/Help';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// import Modeldata from './modeldata';
import Bulk from '../pages/Bulk'
import Login from '../pages/Login'
import Register from '../pages/Register'



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};


const Headers = ({ handleLoginClick }) => {

    const handleClick = () => {
        handleLoginClick();
    };

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { categorys } = useSelector(state => state.home)
    const { userInfo } = useSelector(state => state.auth)
    const { card_product_count, wishlist_count } = useSelector(state => state.card)

    const { pathname } = useLocation()
    const [showShidebar, setShowShidebar] = useState(true);
    const [categoryShow, setCategoryShow] = useState(true)
    const [searchValue, setSearchValue] = useState('')
    const [category, setCategory] = useState('')

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const search = () => {
        navigate(`/products/search?category=${category}&&value=${searchValue}`)
    }
    const redirect_card_page = () => {
        if (userInfo) {
            navigate(`/card`)
        } else {
            navigate(`/login`)
        }
    }

    useEffect(() => {
        if (userInfo) {
            dispatch(get_card_products(userInfo.id))
            dispatch(get_wishlist_products(userInfo.id))
        }
    }, [userInfo])
    return (


        <div className='w-full bg-white'>
            <div className='w-white'>
                <div className='w-[95%] lg:w-[90%] mx-auto'>
                    <div className='h-[90px] md-lg:h-[100px] flex justify-between items-center flex-wrap  md:flex-nowrap'>

                        <div className='md-lg:w-full  w-3/12 md-lg:pt-4'>
                            <div className='flex justify-between items-center w-full md:w-auto'>
                                <Link to='/'>
                                    <img src="http://localhost:3000/images/logo.png" alt="logo" className="h-8 md:h-12" />
                                </Link>
                                <div className='justify-center items-center w-[30px] h-[30px] bg-white text-slate-600 border border-slate-600 rounded-sm cursor-pointer lg:hidden md-lg:flex xl:hidden hidden' onClick={() => setShowShidebar(false)}>
                                    <span><FaList /></span>
                                </div>
                            </div>
                        </div>

                        <div className='md-lg:w-full w-9/12'>

                            <div className='flex justify-between md-lg:justify-center items-center sm:hidden flex-wrap'>


                                {/* <div className='flex justify-start items-start gap-3 text-sm font-bold uppercase md-lg:hidden' >
                                    <div className='flex border rounded-full h-[50px] items-center relative gap-2 grow  justify-center my-2 md:my-0 md:justify-start'>
                                        <div className='relative after:absolute after:h-[25px] after:w-[1px] after:bg-[#afafaf] after:-right-[15px] md:hidden flex w-full max-w-xs md:max-w-md lg:max-w-lg'>
                                            <select onChange={(e) => setCategory(e.target.value)} className='w-[140px] text-black font-medium bg-transparent px-3 h-full outline-0 border-none hidden md:block md:w-1/3' name="" id="">
                                                <option value="">Search here</option>
                                                {
                                                  categorys.map((c, i) => <option key={i} value={c.name}>{c.name}</option>)
                                                }
                                            </select>
                                        </div>
                                        <input className=' w-2/3 md:w-full px-3 relative bg-transparent text-slate-500 outline-0 h-full' onChange={(e) => setSearchValue(e.target.value)} type="text" name="" id="" />
                                        <button onClick={search} className='bg-red-500 right-0 rounded-r-full  h-full font-semibold uppercase text-white px-4 text-2xl '><IoMdSearch /></button>
                                    </div>
                                </div> */}
                                <div className='flex justify-start items-start gap-3 text-sm font-bold uppercase md-lg:hidden' >
                                    <div className='flex border rounded-full h-[50px] items-center relative gap-2 justify-center my-2 md:my-0 md:justify-start'>
                                        <div className='relative after:absolute after:h-[25px] after:w-[1px] after:bg-[#afafaf] after:-right-[15px] md:hidden flex max-w-xs md:max-w-md lg:max-w-lg'>
                                            <select onChange={(e) => setCategory(e.target.value)} className='w-[140px] text-black font-medium bg-transparent px-3 h-full outline-0 border-none ' name="" id="">
                                                <option value="">Search here</option>
                                                {
                                                    categorys.map((c, i) => <option key={i} value={c.name}>{c.name}</option>)
                                                }
                                            </select>
                                        </div>
                                        <input className='w-[300px] px-3 relative bg-transparent text-slate-500 outline-0 h-full' onChange={(e) => setSearchValue(e.target.value)} type="text" name="" id="" />
                                        <button onClick={search} className='bg-red-500 right-0 rounded-r-full  h-full font-semibold uppercase text-white px-5 text-2xl '><IoMdSearch /></button>
                                    </div>
                                </div>


                                <div className='flex md-lg:hidden justify-center items-center'>

                                    <div className=' relative'>
                                        <div onMouseEnter={() => setCategoryShow(!categoryShow)} className='flex rounded-lg cursor-pointer hover:bg-slate-200 py-2 justify-center items-center gap-2 text-sm w-[200px]'>
                                            <div className="flex gap-3 text-lg text">
                                                <span>
                                                    {
                                                        userInfo ? <Link className='flex cursor-pointer  justify-center items-center gap-2 ' to=''>
                                                            <span className=' text-2xl '><FaUser /></span>
                                                            <span >{userInfo.name}</span>
                                                        </Link> : <Link to='' className='flex cursor-pointer justify-center items-center gap-2 text-sm'>
                                                            <span ><FaUser /></span>
                                                            <span className=''>Login/Signup</span>
                                                        </Link>
                                                    }

                                                </span>
                                            </div>
                                        </div>
                                        <div className={`${categoryShow ? 'h-0' : 'h-auto '} overflow-hidden border-none  transition-all rounded-b-lg md-lg:relative duration-500 absolute z-[99999] bg-white w-full border-x`}>
                                            <ul className=' font-medium h-full overflow-auto '>
                                                <li className=' m-2 flex justify-start hover:bg-red-500 hover:text-white rounded-lg   cursor-pointer items-center gap-4 px-[24px] py-[6px]'>
                                                    {
                                                        userInfo ? <Link className='flex cursor-pointer justify-center items-center gap-2 ' to='/dashboard'>
                                                            <span className='text-lg'><FaUser /></span>
                                                            <span className=''>{userInfo.name}</span>
                                                        </Link> : <Link to='/login' className='flex cursor-pointer justify-center items-center gap-2 text-sm'>
                                                            <span><FaUser /></span>
                                                            <span>Login</span>
                                                        </Link>
                                                    }
                                                </li>
                                                <hr />
                                                <li className=' m-2 flex justify-start hover:bg-red-500 hover:text-white  cursor-pointer items-center gap-4 px-[24px] py-[6px]'>
                                                    <span className='pt-1' onClick={handleOpen}  ><AccountCircleIcon /></span>
                                                    <Link to={`/products?category`} className=''>My Profile</Link>
                                                </li>
                                                <hr />
                                                <li className=' m-2 flex justify-start hover:bg-red-500 hover:text-white rounded-lg cursor-pointer items-center gap-4 px-[24px] py-[6px]'>
                                                    <span className='pt-1'><GradingIcon /></span>
                                                    <Link to={`/products?category`} className=''>My Orders</Link>
                                                </li>
                                                <hr />
                                                <li className=' m-2 flex justify-start hover:bg-red-500 hover:text-white rounded-lg cursor-pointer items-center gap-4 px-[24px] py-[6px]'>
                                                    <span className='pt-1'><FavoriteIcon /></span>
                                                    <Link to={`/products?category`} className=''>My WishList</Link>
                                                </li>
                                                <hr />
                                                <li className=' m-2 flex justify-start hover:bg-red-500 hover:text-white rounded-lg cursor-pointer items-center gap-4 px-[24px] py-[6px]'>
                                                    <span className='pt-1'><HelpIcon /></span>
                                                    <Link to={`/products?category`} className=''>Help</Link>
                                                </li>
                                                <hr />
                                                <li className=' m-2 flex justify-start hover:bg-red-500 hover:text-white rounded-lg cursor-pointer items-center gap-4 px-[24px] py-[6px]'>
                                                    <span className='pt-1'><ExitToAppIcon /></span>
                                                    <Link to={`/products?category`} className='text-lg  block'>Sign Out</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>


                                    <div className='flex justify-end items-center gap-4'>


                                        <Link className='flex cursor-pointer justify-center items-center gap-2 rounded-lg hover:bg-slate-200 py-2 px-4 ' to='/bulk'>
                                            <span className=' text-2xl ' ><MdLibraryBooks /></span>
                                            <span >Bulk enquiry</span>


                                        </Link>


                                        {/* <Button >Open modal</Button> */}

                                        <Modal open={open} onClose={handleClose} >
                                            <Box sx={style}>
                                                <Typography  >
                                                    <Login />
                                                </Typography>

                                                <Typography  >
                                                   
                                                </Typography>
                                            </Box>
                                        </Modal>





                                        <Link className='flex cursor-pointer justify-center items-center gap-2 rounded-lg  hover:bg-slate-200 py-2 px-4 ' to='/becomeseller'>
                                            <span className=' text-2xl '><FaStore /></span>
                                            <span className=''>Become a sellera </span>
                                        </Link>

                                        <div className='flex justify-center gap-3'>

                                            <div onClick={() => navigate(userInfo ? '/dashboard/my-wishlist' : '/login')} className='relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'>
                                                <span className='text-xl text-red-500'><AiFillHeart /></span>
                                                {
                                                    wishlist_count !== 0 && <div className='w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]'>
                                                        {wishlist_count}
                                                    </div>
                                                }
                                            </div>

                                            <div onClick={redirect_card_page} className='relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-red-500'>
                                                <span className='text-xl text-white'><FaCartArrowDown /></span>
                                                {
                                                    card_product_count !== 0 && <div className='w-[40px] h-[40px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]'>
                                                        {
                                                            card_product_count
                                                        }
                                                    </div>
                                                }
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )

}

export default Headers