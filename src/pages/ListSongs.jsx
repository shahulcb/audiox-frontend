import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MusicCard from '../components/MusicCard'
import instance from '../axios'
import Drawer from '../components/Drawer'

const ListSongs = () => {
    const { userId } = useParams()
    const [songs, setSongs] = useState([])

    useEffect(() => {
        const fetchUserSongs = async () => {
            try {
                const response = await instance.get(`song/get-songs-by-user/${userId}/`, { withCredentials: true })
                setSongs(response.data.songs)
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserSongs()
    }, [])
    return (
        <Drawer>
            <div>
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
            </div>
        </Drawer>
    )
}

export default ListSongs
