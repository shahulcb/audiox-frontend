import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MusicCard from '../components/MusicCard'
import instance from '../axios'
import Drawer from '../components/Drawer'
import Loader from "../components/Loader"

const ListSongs = () => {
    const { userId } = useParams()
    const [songs, setSongs] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchUserSongs = async () => {
            setLoading(true)
            try {
                const response = await instance.get(`song/get-songs-by-user/${userId}/`, { withCredentials: true })
                setSongs(response.data.songs)
                setLoading(false)
            } catch (error) {
                setLoading(true)
            }
        }
        fetchUserSongs()
    }, [])
    return (
        <Drawer>
            <div>
                {loading && <Loader />}
                {!loading && <>
                    {songs.length === 0 &&
                        <p className='text-base font-medium'>No songs!</p>
                    }
                    {songs && songs.map((song) => (
                        <MusicCard
                            title={song.title}
                            author={song.user}
                            to={`${song.title}/${song._id}`}
                            key={song._id}
                            songImage={song.bgImage}
                        />
                    ))}
                </>}
            </div>
        </Drawer>
    )
}

export default ListSongs
