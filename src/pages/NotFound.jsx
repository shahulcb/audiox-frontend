import React from 'react'
import gif from "../images/404.gif"

const NotFound = () => {
    return (
        <div className='h-screen w-full flex justify-center items-center bg-base-200'>
            <div className='max-w-96 text-center'>
                <img src={gif} alt="404!" />
                <h1 className='text-3xl font-bold'>404!</h1>
                <h1 className='text-xl font-medium my-2.5'>Page not found</h1>
                <button className='btn btn-warning'>Got to dashboard</button>
            </div>
        </div>
    )
}

export default NotFound
