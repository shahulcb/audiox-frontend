import React, { useEffect, useState } from 'react'
import Drawer from '../components/Drawer'
import MusicCard from '../components/MusicCard'
import Carousel from '../components/Carousel'
import instance from '../axios'
import toast from 'react-hot-toast'
import Loader from '../components/Loader'

const Dashboard = () => {
    const [songs, setSongs] = useState([])
    const [popularSongs, setPopularSongs] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchAllSongs = async () => {
            setLoading(true)
            try {
                const response = await instance.get("song/get-all-songs", { withCredentials: true })
                setSongs(response.data.songs)
                setLoading(false)
            } catch (error) {
                setLoading(true)
            }
        }
        fetchAllSongs()
    }, [])

    useEffect(() => {
        const fetchPopularSongs = async () => {
            setLoading(true)
            try {
                const response = await instance.get("rating/get-popular-songs", { withCredentials: true })
                setPopularSongs(response.data.topSongs)
                setLoading(false)
            } catch (error) {
                setLoading(true)
            }
        }
        fetchPopularSongs()
    }, [])

    return (
        <Drawer>
            {loading &&
                <Loader />
            }
            {!loading && <>
                <h4 className='text-lg font-bold mb-5'>Top popular songs</h4>
                <Carousel data={popularSongs} />
                <div className='flex flex-col gap-3 mt-5'>
                    {songs && songs.map((song) => (
                        <MusicCard
                            title={song.title}
                            author={song.user}
                            usedFor={"profile"}
                            to={`${song.user.username}/${song.title}/${song._id}`}
                            key={song._id}
                            songImage={song.bgImage}
                        />
                    ))}
                </div>
            </>}
        </Drawer>
    )
}

export default Dashboard
