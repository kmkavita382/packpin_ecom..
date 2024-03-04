import React, { useEffect, useState } from 'react'
import { AiFillHeart, AiOutlineShoppingCart } from 'react-icons/ai'
import { FaEye } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Ratings from '../Ratings'
import { add_to_card, messageClear, add_to_wishlist } from '../../store/reducers/cardReducer'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Details from '../../pages/CardDetals'


const style = {
    position: 'absolute',
    top: '50%',
    left: '83%',
    transform: 'translate(-50%, -50%)',
};

const FeatureProducts = ({ products }) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { product } = useSelector(state => state.home)

    const [quantity, setQuantity] = useState(0)

    const inc = () => {
        if (quantity >= product.stock) {
            toast.error('Out of stock')
        } else {
            setQuantity(quantity + 1)
        }
    }

    const dec = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const buy = () => {
        let price = 0;
        if (product.discount !== 0) {
            price = product.price - Math.floor((product.price * product.discount) / 100)
        } else {
            price = product.price
        }
        const obj = [
            {
                sellerId: product.sellerId,
                shopName: product.shopName,
                price: quantity * (price - Math.floor((price * 5) / 100)),
                products: [
                    {
                        quantity,
                        productInfo: product
                    }
                ]
            }
        ]
        navigate('/shipping', {
            state: {
                products: obj,
                price: price * quantity,
                shipping_fee: 85,
                items: 1
            }
        })
    }





    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.auth)
    const { successMessage, errorMessage } = useSelector(state => state.card)

    const settings = {
        className: "center",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        swipeToSlide: true,
    };

    const add_card = (id) => {
        if (userInfo) {
            dispatch(add_to_card({
                userId: userInfo.id,
                quantity: 1,
                productId: id
            }))
        } else {
            navigate('/login')
        }
    }
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
    }, [errorMessage, successMessage])

    const add_wishlist = (pro) => {
        dispatch(add_to_wishlist({
            userId: userInfo.id,
            productId: pro._id,
            name: pro.name,
            price: pro.price,
            image: pro.images[0],
            discount: pro.discount,
            rating: pro.rating,
            slug: pro.slug
        }))
    }





    return (
        <div className='w-[90%] flex flex-wrap justify-center items-center  mx-auto '>
            <div className='w-full'>
                <div className='flex justify-start items-start flex-col  relative text-center text-4xl text-slate-600 font-bold ml-20 pb-11'>
                    <h2>FOOD PACKAGING</h2>
                </div>
            </div>
            <div className='rounded-xl grid grid-cols-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 md-lg:grid-cols-3 gap-9 p-2'>
                {
                    products.map((p, i) => <div key={i} className=' m-2  h-[553] w-[319px]   group  border p-3 bg-[#f2f2f2] rounded-2xl group transition-all duration-500 hover:shadow-md hover:-mt-3'>

                        <div className='relative overflow-hidden'>
                            {
                                p.discount ? <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>{p.discount}%</div> : ""
                            }
                            <Link to={`/product/details/${p.slug}`}><img className='sm:w-full w-[298px] rounded-3xl h-[315px]' src={p.images[0]} alt="product images" ></img></Link>
                            <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                                <li onClick={() => add_wishlist(p)} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all'><AiFillHeart /></li>
                                <Link to={`/product/details/${p.slug}`} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all' ><FaEye /></Link>
                                <li onClick={() => add_card(p._id)} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all'><AiOutlineShoppingCart /></li>

                            </ul>
                        </div>

                        <div className='mt-[19px] text-black px-3 '>
                            <span className='font-bold' >{p.name}</span>
                            {/* <span className=''>{p.description}</span> */}
                            <div className='flex mt-[19px]'>
                                <span className='mr-3'>By: Shop name </span>
                                <Ratings ratings={p.rating} />
                            </div>

                            <div className='flex mt-3'>
                                <div className='flex flex-col mr-10'>
                                    {
                                        <span className="text-black text-[1.62em] w-[auto] font-bold">${p.price - Math.floor((p.price * p.discount) / 100)}</span>

                                    }

                                    <div className='mt-[-8px] mb-3'>
                                        {
                                            p.discount !== 0 ? <>
                                                <span className='line-through text-black text-[0.625em] mr-1 '>${p.price}</span>
                                                <span className="text-[0.75em] text-[green] font-bold ">$(-{p.discount}%)</span>
                                            </> : <span className="text-[0.75em] text-[green] font-bold ">Price : ${p.price}</span>
                                        }
                                        {/* <span className="text-[0.75em] text-[green] font-bold "></span> */}
                                    </div>
                                </div>

                                <div className='flex' >
                                    <li onClick={() => add_card(p._id)} className='w-[36px] h-[40px] mr-5 cursor-pointer bg-white flex justify-center items-center rounded-full text-black transition-all'><AiOutlineShoppingCart /></li>

                                    <Link  onClick={handleOpen}   ><button className='w-[119px] h-[40px] cursor-pointer hover:shadow-lg hover:shadow-red-500/40 bg-red-500 font-bold rounded-full text-white'>Buy Now</button> </Link>

                                    {/* to={`/product/details/${p.slug}`} */}

                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
            < Modal open={open} onClose={handleClose} >
                <Box sx={style}>
                    <Typography  >
                        <Details/>
                        
                    </Typography>

                    <Typography  >
                    </Typography>
                </Box>
            </Modal>
        </div>

        // <div className='w-[85%] flex flex-wrap mx-auto justify-center items-center'>
        //     <div className='w-full'>
        //         <div className='text-center flex justify-start items-start flex-col text-4xl text-slate-600 font-bold relative pb-[45px]'>
        //             <h2>FOOD PACKAGING</h2>
        //         </div>
        //     </div>
        //     <div className='w-full grid p-2 rounded-xl grid-cols-4 md-lg:grid-cols-3  md:grid-cols-2 sm:grid-cols-1'>
        //         {
        //             products.map((p, i) => <div key={i} className='border m-4 p-3  h-[553] w-[319px] bg-[#f2f2f2] rounded-2xl group transition-all duration-500 hover:shadow-md hover:-mt-3'>

        //                 <div className='relative overflow-hidden'>
        //                     {
        //                         p.discount ? <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>{p.discount}%</div> : ""
        //                     }
        //                      <Link to={`/product/details/${p.slug}`}><img className='sm:w-full w-[298px] rounded-3xl h-[315px]' src={p.images[0]} alt="product images" ></img></Link>
        //                     <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
        //                         <li onClick={() => add_wishlist(p)} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all'><AiFillHeart /></li>
        //                         <Link to={`/product/details/${p.slug}`} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all' ><FaEye /></Link>
        //                         <li  onClick={() => add_card(p._id)} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all'><AiOutlineShoppingCart /></li>

        //                     </ul>
        //                 </div>

        //                 <div className='mt-[19px] text-black px-3 '>
        //                     <span className='font-bold' >{p.name}</span>
        //                     {/* <span className=''>{p.description}</span> */}
        //                     <div className='flex mt-[19px]'>
        //                         <span className='mr-3'>By: Shop name </span>
        //                         <Ratings ratings={p.rating} />
        //                     </div>

        //                     <div className='flex mt-3'>
        //                         <div className='flex flex-col mr-10'>
        //                             {
        //                                 <span className="text-black text-[1.62em] w-[auto] font-bold">${p.price - Math.floor((p.price * p.discount) / 100)}</span>

        //                             }

        //                             <div className='mt-[-8px] mb-3'>
        //                                 {
        //                                     p.discount !== 0 ? <>
        //                                         <span className='line-through text-black text-[0.625em] mr-1 '>${p.price}</span>
        //                                         <span className="text-[0.75em] text-[green] font-bold ">$(-{p.discount}%)</span>
        //                                     </> : <span className="text-[0.75em] text-[green] font-bold ">Price : ${p.price}</span>
        //                                 }
        //                                 {/* <span className="text-[0.75em] text-[green] font-bold "></span> */}
        //                             </div>
        //                         </div>

        //                         <div className='flex' >
        //                             <li onClick={() => add_card(p._id)} className='w-[36px] h-[40px] mr-5 cursor-pointer bg-white flex justify-center items-center rounded-full text-black transition-all'><AiOutlineShoppingCart /></li>

        //                           <Link to={`/product/details/${p.slug}`} ><button className='w-[119px] h-[40px] cursor-pointer hover:shadow-lg hover:shadow-red-500/40 bg-red-500 font-bold rounded-full text-white'>Buy Now</button> </Link> 


        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>)
        //         }
        //     </div>
        // </div>

    )
}

export default FeatureProducts


