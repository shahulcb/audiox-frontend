import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
    return (
        <div className='h-screen flex items-center justify-center px-5'>
            <img src="https://assets.api.uizard.io/api/cdn/stream/19ca3a7b-367e-4395-b766-7aff04a8fd79.png" alt="hero" className='absolute object-cover w-full h-full' />
            <div className='flex flex-col items-center justify-center h-full w-full max-w-80 z-10'>
                <h1 className='text-3xl font-bold mb-4'>AudioX</h1>
                <p className='text-base font-light mb-6'>Listen to free music from your favorite artist</p>
                <Link to={"/sign-up"} className="btn btn-accent w-full">Get started</Link>
                <Link to={"/sign-in"} className='text-sm mt-4'>I already have an account</Link>
            </div>
        </div>
    )
}

export default LandingPage
