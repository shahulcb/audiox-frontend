import React from 'react'
import { Link } from 'react-router-dom'

const Carousel = ({ data }) => {
    return (
        <div className="carousel rounded-md h-56 gap-2">
            {data.map((song) => (
                <Link className="carousel-item" key={song.songId} to={`${song.user}/${song.title}/${song.songId}`}>
                    <img src={song.bgImage} alt="Burger" className='object-cover' />
                </Link>
            ))}
        </div>
    )
}

export default Carousel
