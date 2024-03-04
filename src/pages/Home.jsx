import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Heders from '../components/Headers'
import Banner from '../components/Banner'
import Categorys from '../components/Categorys'
import FeatureProducts from '../components/products/FeatureProducts'
import products from '../components/products/Products'
import Footer from '../components/Footer'
import {  get_products } from '../store/reducers/homeReducer'
import Slidex from '../components/Slidex'
import Feature from './Feature'



const Home = () => {
    const dispatch = useDispatch()
    const {products } = useSelector(state => state.home)
    useEffect(() => {
        dispatch(get_products())
    }, [])

    return (
        <div className='w-full'>
            <Heders />
            <Banner />
            <div className='my-5'>
                <Categorys />
            </div>
            
            <div className='py-[45px]'>
                <FeatureProducts products={products} name='Feature Products' />
            </div>
            <div>
            <Slidex/>
            </div>
            <div className='bg-[#d9d9d9] py-10 border-none '>
                <Feature/>
                <FeatureProducts products={products}/>  
            </div>  
            <Footer />
        </div>
    )
}

export default Home