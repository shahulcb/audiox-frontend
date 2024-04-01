import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCirclePlus, faStar } from '@fortawesome/free-solid-svg-icons'
import instance from "../axios"
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import StarRating from './StarRating'

const MusicDetailsCard = ({ audioSrc, title, genre, author, isExistInPlaylist, songImage, overallRating, updatePlaylistStatus }) => {
    const { songId } = useParams()
    const [createPlaylist, setCreatePlaylist] = useState(false)
    const [playlists, setPlaylists] = useState([])

    const initialValues = {
        title: ''
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("title is required")
    })

    const getMyAllPlaylist = async () => {
        try {
            const response = await instance.get("playlist/list-all-playlists", { withCredentials: true })
            setPlaylists(response.data.playlists)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    const handleAddToPlaylist = async (playlistId) => {
        try {
            const response = await instance.post("playlist/add-to-playlist", { playlistId, songId }, { withCredentials: true })
            toast.success(response.data.message)
            document.getElementById("formButton").click()
            updatePlaylistStatus()
        } catch (error) {
            document.getElementById("formButton").click()
            toast.error(error.response.data.message)
        }
    }
    const handleCreatePlaylistAndAddSong = async (values) => {
        try {
            const newPlaylist = await instance.post("playlist/create-playlist", { ...values }, { withCredentials: true })
            const response = await instance.post("playlist/add-to-playlist", { playlistId: newPlaylist.data.newPlaylist._id, songId }, { withCredentials: true })
            toast.success(response.data.message)
            document.getElementById("formButton").click()
        } catch (error) {
            toast.error(error.response.data.message)
            document.getElementById("formButton").click()
        }
    }
    return (
        <div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box max-h-[500px]">
                    <form method="dialog" className='flex items-center justify-end' onSubmit={() => setCreatePlaylist(false)}>
                        <button className="btn btn-sm btn-circle btn-ghost" id='formButton'>✕</button>
                    </form>
                    <div className='flex flex-col gap-3 mt-5'>
                        {!createPlaylist ? (
                            <button className="btn btn-accent" onClick={() => setCreatePlaylist(true)}>Create new playlist and add</button>
                        ) : (
                            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleCreatePlaylistAndAddSong}>
                                <Form className='flex gap-3'>
                                    <div className='form-control'>
                                        <Field type="text" className='input input-bordered w-full' id="title" name="title" placeholder="playlist title" />
                                        <ErrorMessage name='title' component={"span"} />
                                    </div>
                                    <button className='btn btn-warning' type='button' onClick={() => setCreatePlaylist(false)}>Cancel</button>
                                    <button className='btn btn-success'>Save</button>
                                </Form>
                            </Formik>
                        )}

                        {playlists.map((playlist) => (
                            <div className="bg-base-200 p-4 rounded-lg flex gap-3 items-center" key={playlist._id} onClick={() => handleAddToPlaylist(playlist._id)}>
                                <h1 className='text-base font-bold'>{playlist.title}</h1>
                                <span className='text-sm font-medium'>({playlist.songs.length})Songs</span>
                            </div>
                        ))}
                    </div>
                </div>
            </dialog >
            <div className="card glass">
                <figure><img src={songImage} alt="car!" className='w-full h-[350px] object-contain' /></figure>
                <div className="card-body gap-5">
                    <div className='flex items-center justify-between'>
                        <div className='flex gap-6'>
                            <div>
                                <h2 className="card-title">{title}</h2>
                                <p>{author}</p>
                            </div>
                            <p className='text-lg font-bold'>{overallRating} <FontAwesomeIcon icon={faStar} className='w-4 h-4 ml-1' /></p>
                        </div>
                        <div className='flex items-center gap-5'>
                            {isExistInPlaylist ?
                                <button className='btn btn-ghost'><FontAwesomeIcon icon={faCircleCheck} size='2x' /></button>
                                :
                                <button className='btn btn-ghost' onClick={() => { document.getElementById('my_modal_3').showModal(); getMyAllPlaylist() }}><FontAwesomeIcon icon={faCirclePlus} size='2x' /></button>
                            }
                        </div>
                    </div>
                    <StarRating songId={songId} />
                    <audio src={audioSrc} className='w-full' controls autoPlay></audio>
                </div>
            </div>
        </div >
    )
}

export default MusicDetailsCard
