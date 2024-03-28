import React, { useEffect, useState } from 'react'
import Drawer from '../components/Drawer'
import MusicCard from '../components/MusicCard'
import { useNavigate, useParams } from 'react-router-dom'
import instance from '../axios'
import toast from 'react-hot-toast'

const DetailedPlaylist = () => {
    const { playlistId } = useParams()
    const navigate = useNavigate()
    const [playlist, setPlayList] = useState({})
    const [songs, setSongs] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [idsForDelete, setIdForDelete] = useState([])
    const [input, setInput] = useState('')
    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const response = await instance.get(`playlist/list-playlist-songs/${playlistId}`, { withCredentials: true })
                setPlayList(response.data.playlist)
                setSongs(response.data.songs)
                setInput(response.data.playlist.title)
            } catch (error) {
                toast.error(error.response.data.message)
            }
        }
        fetchPlaylist()
    }, [editMode])
    const handleDeletePlaylist = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this playlist?");
        if (confirmed) {
            try {
                const response = await instance.post("playlist/delete-playlist", { playlistId }, { withCredentials: true })
                toast.success(response.data.message)
                navigate("../")
            } catch (error) {
                toast.error(error.response.data.message)
            }
        }
    }
    const handleIdForDeleteSong = (id) => {
        setIdForDelete((prevState) => [...prevState, id])
        setSongs((prevState) => prevState.filter((ele) => ele._id !== id))
    }
    const handleSaveChanges = async () => {
        const confirmed = window.confirm("Are you sure you want to save changes?");
        if (confirmed) {
            try {
                const response = await instance.post("playlist/update-playlist", { idsForDelete, playlistId, title: input }, { withCredentials: true })
                toast.success(response.data.message)
                setEditMode(false)
                setInput('')
            } catch (error) {
                toast.error(error.response.data.message)
                setEditMode(false)
            }
        } else {
            setEditMode(false)
        }
    }
    return (
        <Drawer>
            <div className='flex items-center justify-between gap-5'>
                <input type="text" defaultValue={playlist.title} placeholder='Playlist title' onChange={(e) => setInput(e.target.value)} className={`input flex-1 ${editMode ? "input-bordered" : ""}`} disabled={!editMode} />
                <div className='flex gap-3'>
                    {editMode ? (
                        <>
                            <button className='btn btn-warning flex-1' onClick={() => setEditMode(false)}>Discard changes</button>
                            <button className='btn btn-success flex-1' onClick={handleSaveChanges}>Save changes</button>
                        </>
                    ) : (
                        <>
                            <button className='btn btn-accent flex-1' onClick={() => setEditMode(true)}>Edit</button>
                            <button className='btn btn-error flex-1' onClick={handleDeletePlaylist}>Delete playList</button>
                        </>
                    )}

                </div>
            </div>
            <div className='flex flex-col gap-3 mt-5'>
                {songs && songs.map((song) => (
                    <MusicCard
                        title={song.title}
                        author={song.user}
                        editMode={editMode}
                        to={`${song.title}/${song._id}`}
                        key={song._id}
                        usedFor={"playlist"}
                        songImage={song.bgImage}
                        handleIdForDeleteSong={() => handleIdForDeleteSong(song._id)}
                    />
                ))}
            </div>
        </Drawer >
    )
}

export default DetailedPlaylist
