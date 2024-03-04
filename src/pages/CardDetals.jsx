import React, { useEffect, useState } from 'react'
import Headers from '../components/Headers'
import Footer from '../components/Footer'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { useDispatch, useSelector } from 'react-redux'
import 'swiper/css/pagination'
import { Pagination } from 'swiper'
import Ratings from '../components/Ratings'
import Reviews from '../components/Reviews'
import { get_product } from '../store/reducers/homeReducer'
import { add_to_card, messageClear, add_to_wishlist } from '../store/reducers/cardReducer'
import toast from 'react-hot-toast'
import { AiFillHeart, AiOutlineShoppingCart } from 'react-icons/ai'
import { FaEye } from 'react-icons/fa'

const Details = () => {

    const navigate = useNavigate()
    const { slug } = useParams()
    const dispatch = useDispatch()
    const { product, relatedProducts, moreProducts } = useSelector(state => state.home)
    const { userInfo } = useSelector(state => state.auth)
    const { errorMessage, successMessage } = useSelector(state => state.card)

    const [image, setImage] = useState('')
    const [state, setState] = useState('reviews')





    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 4
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4
        },
        mdtablet: {
            breakpoint: { max: 991, min: 464 },
            items: 4
        },
        mobile: {
            breakpoint: { max: 768, min: 0 },
            items: 3
        },
        smmobile: {
            breakpoint: { max: 640, min: 0 },
            items: 2
        },
        xsmobile: {
            breakpoint: { max: 440, min: 0 },
            items: 1
        }
    }

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

    const add_card = () => {
        if (userInfo) {
            dispatch(add_to_card({
                userId: userInfo.id,
                quantity,
                productId: product._id
            }))
        } else {
            navigate('/login')
        }
    }

    const add_wishlist = () => {
        if (userInfo) {
            dispatch(add_to_wishlist({
                userId: userInfo.id,
                productId: product._id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                discount: product.discount,
                rating: product.rating,
                slug: product.slug
            }))
        } else {
            navigate('/login')
        }

    }

    useEffect(() => {
        dispatch(get_product(slug))
    }, [slug])
    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
        }
    }, [errorMessage, successMessage])

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
    return (
        <div className='h-[100vh] w-[600px] bg-white p-5'>
            <div className='w-full md:w-[80%] sm:w-[90%] lg:w-[90%] h-[170px] pb-16'>
                <div className=' flex gap-4'>

                    <div className='border rounded-lg h-[144px] w-[144px] items-center'>
                        <img className='border rounded-lg'  src={image ? image : product.images?.[0]} alt="" />
                    </div>

                    <div className='flex flex-col h-[170px] w-[400px] '>
                        <div className='text-3xl text-slate-600 flex gap-4 font-bold'>
                            <h2>{product.name}</h2>
                            <div className='flex justify-start items-center gap-4'>
                                <div className='flex text-xl'>
                                    <Ratings ratings={product.rating} />
                                </div>
                                <span className='text-green-500'>(23 reviews)</span>
                            </div>
                        </div>

                        <div className='text-2xl text-red-500 font-bold flex gap-3'>
                            {
                                product.discount !== 0 ? <>
                                    <h2 className='line-through'>${product.price}</h2>
                                    <h2>${product.price - Math.floor((product.price * product.discount) / 100)} (-{product.discount}%)</h2>
                                </> : <h2>Price : ${product.price}</h2>
                            }
                        </div>
                    </div>
                </div>
            </div>


            <div className='flex flex-col gap-5'>
                <div className='text-slate-600'>
                    <p>{product.description}</p>
                </div>
                <div className='py-5 gap-5  '>
                    <h1 className=''>Choose size</h1>
                    <div className='flex gap-3 flex-grow my-4'>
                        <span className='px-8 py-3 h-[50px] cursor-pointer hover:text-white hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/40 rounded-2xl bg-white-500 text-black border-solid border-2 border-red-500 '>8.5x4.5x3.5in</span>
                        <span className='px-8 py-3 h-[50px] cursor-pointer hover:text-white hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/40 rounded-2xl bg-white-500 text-black border-solid border-2 border-red-500 '>8.5x4.5x3.5in</span>
                        <span className='px-8 py-3 h-[50px] cursor-pointer hover:text-white hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/40 rounded-2xl bg-white-500 text-black border-solid border-2 border-red-500 '>8.5x4.5x3.5in</span>
                        {/* <span className='px-8 py-3 h-[50px] cursor-pointer hover:text-white hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/40 rounded-2xl bg-white-500 text-black border-solid border-2 border-red-500 '>8.5x4.5x3.5in</span> */}
                    </div>
                    <div className='flex gap-3 flex-grow'>
                        <span className='px-8 py-3 h-[50px] cursor-pointer hover:text-white hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/40 rounded-2xl bg-white-500 text-black border-solid border-2 border-red-500 '>8.5x4.5x3.5in</span>
                        <span className='px-8 py-3 h-[50px] cursor-pointer hover:text-white hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/40 rounded-2xl bg-white-500 text-black border-solid border-2 border-red-500 '>8.5x4.5x3.5in</span>
                        <span className='px-8 py-3 h-[50px] cursor-pointer hover:text-white hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/40 rounded-2xl bg-white-500 text-black border-solid border-2 border-red-500 '>8.5x4.5x3.5in</span>
                        {/* <span className='px-8 py-3 h-[50px] cursor-pointer hover:text-white hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/40 rounded-2xl bg-white-500 text-black border-solid border-2 border-red-500 '>8.5x4.5x3.5in</span> */}
                    </div>
                    <h1 className='mt-4'>Quantity</h1>
                    <div className='flex gap-3 flex-grow my-4'>
                        <span className='px-8 py-3 h-[50px] cursor-pointer hover:text-white hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/40 rounded-2xl bg-white-500 text-black border-solid border-2 border-red-500 '>8.5x4.5x3.5in</span>
                        <div className='flex gap-3 '>
                            {
                                product.stock ? <>
                                    <div className='flex bg-slate-200 h-[50px] rounded-full justify-center items-center text-xl'>
                                        <div onClick={dec} className='px-6 cursor-pointer'>-</div>
                                        <div className='px-5'>{quantity}</div>
                                        <div onClick={inc} className='px-6 cursor-pointer'>+</div>
                                    </div>
                                    <div>
                                        {/* <button onClick={add_card} className='px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-purple-500/40 bg-red-500 rounded-full text-white'>Add To Card</button> */}
                                    </div>
                                </> : ''
                            }

                        </div>

                    </div>
                </div>

            </div>


            <div className='w-full mt-28 '>
                {
                    product.stock ? <button onClick={buy} className='w-full py-3  h-[50px] cursor-pointer hover:shadow-lg hover:shadow-emerald-500/40 rounded-full bg-red-500 font-bold text-white'>Buy Now</button> : ""
                }
                <div>
                    <button onClick={add_card} className='w-full py-3 h-[50px] my-3 cursor-pointer hover:shadow-lg hover:shadow-purple-500/40 bg-red-500 rounded-full font-bold text-white'>Add To Card</button>
                </div>
            </div>
        </div >
    )
}

export default Details