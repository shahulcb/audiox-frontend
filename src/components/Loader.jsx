import React from 'react'

const Loader = () => {
    return (
        <div className='w-full min-h-[400px] flex items-center justify-center backdrop-blur-[3px]'>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    )
}

export default Loader
