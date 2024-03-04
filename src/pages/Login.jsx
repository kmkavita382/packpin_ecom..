import React, { useState, useEffect } from 'react'
// import Headers from '../components/Headers'
// import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import FadeLoader from 'react-spinners/FadeLoader'
import { useSelector, useDispatch } from 'react-redux'
import { customer_login, messageClear } from '../store/reducers/authReducer'
import toast from 'react-hot-toast'
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";


const Login = () => {

    const { loader, successMessage, errorMessage, userInfo } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const [state, setState] = useState({
        email: '',
        password: ''
    })

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const login = (e) => {
        e.preventDefault()
        dispatch(customer_login(state))
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
        if (userInfo) {
            navigate('/')
        }
    }, [successMessage, errorMessage])

    return (
        <div>
            {/* <Headers /> */}
            {
                loader && <div className='w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
                    <FadeLoader />
                </div>
            }
            <div className='bg-slate-200 mt-4'>
                <div className='w-full justify-center items-center p-10'>
                    <div className='grid grid-cols w-[540px] h-[631px] mx-auto bg-white rounded-3xl'>
                        <div className='px-[60px] py-[10px]'>
                            {/* <div className='h-[36px] w-[36px] ml-[200px] m-10 bg-[#FF5A5A] text-center rounded-full'></div> */}
                            <h2 className='text-center w-full text-[46px] font-bold'>Create an account</h2>
                            <div>
                                <form onSubmit={login} className='text-slate-600 pt-[60px]'>
                                    <div className='flex flex-col gap-1 mb-2'>
                                        <label htmlFor="email">Email</label>
                                        <input onChange={inputHandle} value={state.email} type="email" className='w-full px-3 py-3 border border-slate-200 outline-none focus:border-red-500 rounded-md' id='email' name='email' placeholder='email' />
                                    </div>
                                    <div className='flex flex-col gap-1 mb-4'>
                                        <label htmlFor="password">Passoword</label>
                                        <input onChange={inputHandle} value={state.password} type="password" className='w-full px-3 py-3 border border-slate-200 outline-none focus:border-red-500 rounded-md' id='password' name='password' placeholder='password' />
                                    </div>
                                    <button className='text-xl px-10 w-full py-3 bg-red-500 border-black  shadow-lg hover:shadow-indigo-500/30 text-white font-bold rounded-xl'>Login</button>
                                </form>
                                <div className='flex justify-center items-center py-2'>
                                    <div className='h-[1px] bg-slate-300 w-[95%]'></div>
                                    <span className='px-3 text-slate-600'>or</span>
                                    <div className='h-[1px] bg-slate-300 w-[95%]'></div>
                                </div>
                                <button className='text-xl px-8 w-full py-3 bg-white shadow hover:shadow-indigo-500/30 text-black font-bold rounded-md flex justify-center items-center gap-2 mb-3'>
                                    <span className='text-3xl text-[#316FF6]'><FaFacebook /></span>
                                    <span>Login with Facebook</span>
                                </button>
                                <button className='text-xl px-8 w-full py-3 bg-white shadow hover:shadow-orange-500/30 text-black font-bold rounded-md flex  justify-center items-center gap-2 mb-3'>
                                    <span className='text-3xl'><FcGoogle /></span>
                                    <span>Login with Google</span>
                                </button>

                            </div>
                            <div className='text-center text-slate-600 pt-1'>
                                <p>You have no account ? <Link className='text-red-500 font-bold ' to='/register'>Register</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default Login