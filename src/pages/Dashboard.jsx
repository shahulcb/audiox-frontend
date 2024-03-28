import React, { useEffect, useState } from 'react'
import Drawer from '../components/Drawer'
import MusicCard from '../components/MusicCard'
import Carousel from '../components/Carousel'
import instance from '../axios'
import toast from 'react-hot-toast'

const Dashboard = () => {
    const [songs, setSongs] = useState([])
    const [popularSongs, setPopularSongs] = useState([])
    useEffect(() => {
        const fetchAllSongs = async () => {
            try {
                const response = await instance.get("song/get-all-songs", { withCredentials: true })
                setSongs(response.data.songs)
            } catch (error) {
                toast.error(error.response.data.message)
            }
        }
        fetchAllSongs()
    }, [])

    useEffect(() => {
        const fetchPopularSongs = async () => {
            try {
                const response = await instance.get("rating/get-popular-songs", { withCredentials: true })
                setPopularSongs(response.data.topSongs)
            } catch (error) {
                console.log(error);
            }
        }
        fetchPopularSongs()
    }, [])
    return (
        <Drawer>
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
        </Drawer>
    )
}

export default Dashboard
