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
        <div>
            <Headers />
            <div className='bg-slate-100 py-5 mb-5'>
                <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                    <div className='flex justify-start items-center text-md text-slate-600 w-full'>
                        <Link to='/'>Home</Link>
                        <span className='pt-1'><MdOutlineKeyboardArrowRight /></span>
                        <Link to='/'>{product.category}</Link>
                        <span className='pt-1'><MdOutlineKeyboardArrowRight /></span>
                        <span>{product.name}</span>
                    </div>
                </div>
            </div>

            <section>
                <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16'>
                    <div className='grid grid-cols-2 md-lg:grid-cols-1   gap-8'>
                        <div className=' ml-8'>
                            <div className='p-5 border h-[500px] w-[500px] items-center'>
                                <img src={image ? image : product.images?.[0]} alt="" />
                            </div>
                            <div className='py-3 w-[500px]'>
                                {
                                    product.images && <Carousel
                                        autoPlay={true}
                                        infinite={true}
                                        responsive={responsive}
                                        transitionDuration={500}
                                    >
                                        {
                                            product.images.map((img, i) => {
                                                return (
                                                    <div key={i} onClick={() => setImage(img)}>
                                                        <img className='h-[120px] cursor-pointer' src={img} alt="" />
                                                    </div>
                                                )
                                            })
                                        }
                                    </Carousel>
                                }
                            </div>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <div className='text-3xl text-slate-600 flex gap-6 font-bold'>
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
                            <div className='text-slate-600'>
                                <p>{product.description}</p>
                            </div>
                            <div className='py-5 gap-5  '>
                                <h1 className=''>Choose size</h1>
                                <div className='flex gap-3 flex-grow my-4'>
                                    <span className='px-8 py-3 h-[50px] cursor-pointer hover:text-white hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/40 rounded-2xl bg-white-500 text-black border-solid border-2 border-red-500 '>8.5x4.5x3.5in</span>
                                    <span className='px-8 py-3 h-[50px] cursor-pointer hover:text-white hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/40 rounded-2xl bg-white-500 text-black border-solid border-2 border-red-500 '>8.5x4.5x3.5in</span>
                                    <span className='px-8 py-3 h-[50px] cursor-pointer hover:text-white hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/40 rounded-2xl bg-white-500 text-black border-solid border-2 border-red-500 '>8.5x4.5x3.5in</span>
                                    <span className='px-8 py-3 h-[50px] cursor-pointer hover:text-white hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/40 rounded-2xl bg-white-500 text-black border-solid border-2 border-red-500 '>8.5x4.5x3.5in</span>
                                </div>
                                <div className='flex gap-3 flex-grow'>
                                    <span className='px-8 py-3 h-[50px] cursor-pointer hover:text-white hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/40 rounded-2xl bg-white-500 text-black border-solid border-2 border-red-500 '>8.5x4.5x3.5in</span>
                                    <span className='px-8 py-3 h-[50px] cursor-pointer hover:text-white hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/40 rounded-2xl bg-white-500 text-black border-solid border-2 border-red-500 '>8.5x4.5x3.5in</span>
                                    <span className='px-8 py-3 h-[50px] cursor-pointer hover:text-white hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/40 rounded-2xl bg-white-500 text-black border-solid border-2 border-red-500 '>8.5x4.5x3.5in</span>
                                    <span className='px-8 py-3 h-[50px] cursor-pointer hover:text-white hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/40 rounded-2xl bg-white-500 text-black border-solid border-2 border-red-500 '>8.5x4.5x3.5in</span>
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
                            <div className='flex gap-3 w-full'>
                                {
                                    product.stock ? <button onClick={buy} className='w-[350px] py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-emerald-500/40 rounded-full bg-red-500 font-bold text-white'>Buy Now</button> : ""
                                }
                                <div>
                                    <button onClick={add_card}  className='w-[350px] py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-purple-500/40 bg-red-500 rounded-full font-bold text-white'>Add To Card</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* ghgjhfhhhhh */}

            <section>
                <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16'>
                    <div className='flex flex-wrap'>

                        <div className='w-full md-lg:w-full'>
                            <div className='pr-4 md-lg:pr-0'>
                                {/* <div className='grid grid-cols-1'>
                                    <button onClick={() => setState('reviews')} className={`py-1 hover:text-white px-5 hover:bg-black ${state === 'reviews' ? 'bg-red-500 text-white' : 'bg-slate-200 text-slate-700'} rounded-sm`}>Reviews</button>
                                    <button onClick={() => setState('description')} className={`py-1 px-5 hover:text-white hover:bg-black bg-red-500 text-white' : 'bg-slate-200 text-slate-700'} rounded-sm`}>Description</button>
                                </div> */}
                                <div className='grid grid-cols-2'>

                                    <div>
                                        <div>
                                            <h1 className='py-8 text-2xl border-black border-b-4'>Product Descripton</h1>
                                        </div>

                                        <div className="flex flex-col text-xl font-semibold text-black max-w-[584px]">

                                            <div className="flex gap-5 justify-between px-4 py-5 w-full bg-white rounded-2xl max-md:flex-wrap max-md:max-w-full">
                                                <div className="flex-auto">Dimensions :</div>
                                                <div className="flex-auto">5 x 4 x 3.5 in</div>
                                            </div>
                                            <div className="flex gap-5 justify-between px-4 py-5 w-full  whitespace-nowrap bg-rose-50 max-md:flex-wrap max-md:max-w-full">
                                                <div>Number of Ply :</div>
                                                <div className="flex-auto">3</div>
                                            </div>
                                            <div className="flex gap-5 justify-between px-4 py-5 w-full bg-white max-md:flex-wrap max-md:max-w-full">
                                                <div className="whitespace-nowrap">Paper Density :</div>
                                                <div className="flex-auto">150 GSM</div>
                                            </div>
                                            <div className="flex gap-5 justify-between px-4 py-5 w-full whitespace-nowrap bg-rose-50 max-md:flex-wrap max-md:max-w-full">
                                                <div>Colour :</div>
                                                <div className="flex-auto">Brown</div>
                                            </div>
                                            <div className="flex gap-5 justify-between px-4 py-5 w-full whitespace-nowrap bg-white max-md:flex-wrap max-md:max-w-full">
                                                <div>Material :</div>
                                                <div className="flex-auto">Paper</div>
                                            </div>
                                            <div className="flex gap-5 justify-between px-4 py-4 w-full whitespace-nowrap bg-rose-50 max-md:flex-wrap max-md:max-w-full">
                                                <div>Shape :</div>
                                                <div className="flex-auto">Rectangular</div>
                                            </div>
                                            <div className="flex gap-5 justify-between px-4 py-4 w-full bg-white rounded-none max-md:flex-wrap max-md:max-w-full">
                                                <div className="flex-auto">Suitable for :</div>
                                                <div className="flex-auto">
                                                    Gift Items, Storage Boxes, Toys , Clothes,{" "}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <h1 className='py-8 text-2xl border-black border-b-4'>Company Details</h1>
                                        </div>
                                        <p className='py-5 text-slate-600'>{product.description}</p></div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section>
                <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16'>
                    <div className='flex flex-wrap'>

                        <div className='w-full md-lg:w-full'>
                            <div className='pr-4 md-lg:pr-0'>
                                <div className='grid grid-cols-4'>
                                    <button onClick={() => setState('reviews')} className='py-8 text-3xl font-bold'>Ratings and Reviews</button>
                                    {/* <button onClick={() => setState('description')} className={`py-1 px-5 hover:text-white hover:bg-black ${state === 'description' ? 'bg-red-500 text-white' : 'bg-slate-200 text-slate-700'} rounded-sm`}>Description</button> */}
                                </div>
                                <div>
                                    {
                                        <Reviews product={product} />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* jfhjfhhjcgvhjgc */}
            <section>
                <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                    <h2 className='text-2xl py-8 text-slate-600'>Related Products</h2>
                    <div>
                        <Swiper
                            slidesPerView='auto'
                            breakpoints={{
                                1280: {
                                    slidesPerView: 3
                                },
                                565: {
                                    slidesPerView: 2
                                }
                            }}
                            spaceBetween={25}
                            loop={true}
                            pagination={{
                                clickable: true,
                                el: '.custom_bullet'
                            }}
                            modules={[Pagination]}
                            className='mySwiper'
                        >
                            {
                                relatedProducts.map((p, i) => {
                                    return (
                                        <SwiperSlide key={i}>
                                            <Link className='block'>
                                                <div className='relative overflow-hidden'>
                                                    {
                                                        p.discount ? <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>{p.discount}%</div> : ""
                                                    }
                                                    <img className='sm:w-full w-[298px] rounded-3xl h-[315px]' src={p.images[0]} alt="product images" />
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
                                                            <button className='w-[119px] h-[40px] cursor-pointer hover:shadow-lg hover:shadow-red-500/40 bg-red-500 font-bold rounded-full text-white'>Buy Now</button>
                                                        </div>
                                                    </div>
                                                </div>

                                            </Link>
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                    </div>
                    <div className='w-full flex justify-center items-center py-10'>
                        <div className='custom_bullet justify-center gap-3 !w-auto'></div>
                    </div>
                </div>
            </section>
            <Footer />
        </div >
    )
}

export default Details