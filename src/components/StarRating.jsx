import React, { useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import instance from '../axios'

const StarRating = ({ songId }) => {
    const [rating, setRating] = useState(0)

    useEffect(() => {
        const fetchRating = async () => {
            try {
                const response = await instance.get(`rating/get-rating/${songId}/`, { withCredentials: true })
                setRating(response.data.rating)
            } catch (error) {
                console.log(error);
            }
        }
        fetchRating()
    }, [rating])

    const handleRating = async (rating) => {
        try {
            const response = await instance.post("rating/add-rating", { rating, songId }, { withCredentials: true })
            setRating(response.data.newRating)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Rating value={rating} onChange={handleRating} style={{ maxWidth: 150 }} />
    )
}

export default StarRating
