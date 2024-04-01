import React, { useEffect, useState } from 'react'
import Drawer from '../components/Drawer'
import PlaylistCard from '../components/PlaylistCard'
import { Link } from 'react-router-dom'
import instance from '../axios'
import toast from 'react-hot-toast'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Loader from "../components/Loader"

const Playlists = () => {
    const [playlists, setPlaylist] = useState([])
    const [loading, setLoading] = useState(false)

    const initialValues = {
        title: ''
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("title is required")
    })
    useEffect(() => {
        const fetchPlaylists = async () => {
            setLoading(true)
            try {
                const response = await instance.get("playlist/list-all-playlists", { withCredentials: true })
                setPlaylist(response.data.playlists)
                setLoading(false)
            } catch (error) {
                setLoading(true)
            }
        }
        fetchPlaylists()
    }, [])

    const handleSubmit = async (values, { resetForm }) => {
        setLoading(true)
        try {
            const response = await instance.post("playlist/create-playlist", { ...values }, { withCredentials: true })
            setPlaylist((prevState) => [...prevState, response.data.newPlaylist])
            toast.success(response.data.message)
            document.getElementById("closeButton").click()
            setLoading(false)
        } catch (error) {
            setLoading(false)
            document.getElementById("closeButton").click()
        }
    }
    return (
        <Drawer>
            {loading && <Loader />}
            {!loading && <>
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" id='closeButton' onClick={() => document.getElementById("playlistForm").reset()}>✕</button>
                        </form>
                        <h3 className="font-medium text-lg mb-4">Create playlist</h3>
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} >
                            <Form className='flex gap-3' id='playlistForm'>
                                <div className='form-control'>
                                    <Field type="text" className="input input-bordered w-full" id="title" name="title" placeholder="Title" />
                                    <ErrorMessage name='title' component={"span"} />
                                </div>
                                <button className='btn btn-success'>Save</button>
                            </Form>
                        </Formik>
                    </div>
                </dialog>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
                    {playlists.map((playlist) => (
                        <Link to={`${playlist._id}`} key={playlist._id}>
                            <PlaylistCard title={playlist.title} />
                        </Link>
                    ))}
                    <Link onClick={() => document.getElementById('my_modal_1').showModal()}>
                        <PlaylistCard type={"create"} />
                    </Link>
                </div>
            </>}
        </Drawer >
    )
}

export default Playlists
