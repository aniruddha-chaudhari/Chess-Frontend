import React from 'react'
import Chessjpeg from '../assets/chessboard-image-8ko1_1rXSJKpZLCP4eKUwQ-W6l0ggzQRM-gpP4lnI_1-g.jpeg'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
    const navigate = useNavigate();
    return (
        <div className='flex justify-center'>
            <div className='pt-8 max-w-xl'>
                <div className='grid grid-cols-1 gap-4
                md:grid-cols-2
                '>
                    <div className='flex justify-center'>
                        <img className='max-h-96' src={Chessjpeg} alt="" />
                    </div>
                    <div className='pt-16'>
                        <div className='flex justify-center'>
                        <h1 className='text-3xl font-bold text-white'>
                            Welcome To Chess
                        </h1>
                        </div>
                        <p className='text-lg mt-2'>
                            Play With Your Friends
                        </p>
                        <div className='flex justify-center'>
                        <div className='mt-4'>
                            <button onClick={() => navigate('/game')} className='px-8 py-4 text-2xl bg-blue-500 text-white hover:bg-green-700 font-bold py-2 px-4 rounded'>
                                Play
                            </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing