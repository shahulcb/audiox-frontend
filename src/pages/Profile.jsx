import React, { useEffect, useState } from 'react'
import Drawer from '../components/Drawer'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from "yup"
import instance from '../axios'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { userUpdate } from '../redux-toolkit/userAuth'
import MusicCard from "../components/MusicCard"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import Loader from "../components/Loader"


const Profile = () => {
    const [editMode, setEditMode] = useState(false)
    const [profileImageEditMode, setProfileImageEditMode] = useState(false)
    const [avatar, setAvatar] = useState(null)
    const dispatch = useDispatch()
    const [songs, setSongs] = useState([])
    const user = useSelector((state) => state.user.user)
    const [loading, setLoading] = useState(false)

    const initialValues = {
        username: user?.username,
        email: user?.email
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('username is required')
            .min(5, 'username must be at least 5 characters')
            .max(30, 'username cannot exceed 30 characters'),
        email: Yup.string().email('Invalid email').required('Email is required'),
    });

    const handleSubmit = async (values) => {
        setLoading(true)
        try {
            const response = await instance.post("/user/update-profile", { ...values }, { withCredentials: true })
            dispatch(userUpdate(response.data.user))
            toast.success(response.data.message)
            setEditMode(false)
            setLoading(false)
        } catch (error) {
            toast.error(error.response.data.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        const getMySongs = async () => {
            setLoading(true)
            try {
                const response = await instance.get("song/get-my-songs", { withCredentials: true })
                setSongs(response.data.songs)
                setLoading(false)
            } catch (error) {
                toast.error(error.response.data.message)
                setLoading(false)
            }
        }
        getMySongs()
    }, [])

    const handleDeleteMySong = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this song?");
        if (confirmed) {
            setLoading(true)
            try {
                const response = await instance.post("song/delete-my-song", { songId: id }, { withCredentials: true })
                setSongs(songs.filter(song => song._id !== id));
                toast.success(response.data.message)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                toast.error(error.response.data.message)
            }
        }
    }

    const handleUploadAvatar = async (e) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData()
        formData.append('avatar', avatar)
        try {
            const response = await instance.post("user/update-avatar", formData, { withCredentials: true })
            dispatch(userUpdate(response.data.user))
            toast.success(response.data.message)
            setProfileImageEditMode(false)
            setLoading(false)
        } catch (error) {
            setProfileImageEditMode(false)
            setLoading(false)
        }
    }
    const handleRemoveAvatar = async (req, res) => {
        const confirmed = window.confirm("Are you sure you want to delete avatar");
        if (confirmed) {
            setLoading(true)
            try {
                const response = await instance.post("user/remove-avatar", {}, { withCredentials: true })
                dispatch(userUpdate(response.data.user))
                toast.success(response.data.message)
                setProfileImageEditMode(false)
                setLoading(false)
            } catch (error) {
                setProfileImageEditMode(false)
                setLoading(false)
            }
        }
    }
    return (
        <Drawer>
            {loading && <Loader />}
            {!loading && <>
                <div className='flex flex-col gap-5 max-w-72 mx-auto items-center'>
                    <div className='relative'>
                        <div className="avatar">
                            <div className="w-20 rounded-full">
                                {user?.avatar ?
                                    <img src={user.avatar} alt='' />
                                    :
                                    <img src={`https://avatar.iran.liara.run/username?username=${user?.username}`} alt='' />
                                }
                            </div>
                        </div>
                        <button className="btn btn-circle btn-accent btn-active absolute -right-2 -top-2 min-h-10 h-10 min-w-10 w-10" onClick={() => setProfileImageEditMode(true)}>
                            <FontAwesomeIcon icon={faPencil} className='text-accent-content' />
                        </button>
                    </div>
                    {profileImageEditMode && (
                        <>
                            {user.avatar &&
                                <button className='btn btn-error w-full' onClick={handleRemoveAvatar}>Remove profile image</button>
                            }
                            <form className='flex flex-col gap-3' onSubmit={handleUploadAvatar}>
                                <div className='form-control'>
                                    <input type="file" accept="image/*" className="file-input file-input-bordered w-full" onChange={(e) => setAvatar(e.target.files[0])} />
                                </div>
                                <div className='flex gap-3'>
                                    <button className="btn btn-error flex-1" type='button' onClick={() => setProfileImageEditMode(false)}>Cancel</button>
                                    <button className="btn btn-success flex-1">Save</button>
                                </div>
                            </form>
                        </>
                    )}
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        {({ resetForm }) => (
                            <Form className='flex flex-col gap-3' autoComplete='off'>
                                <div className='form-control'>
                                    <Field type="text" placeholder="Username" id='username' name='username' className="input input-bordered w-full" disabled={!editMode} />
                                    <ErrorMessage name='username' component={"span"} />
                                </div>
                                <div className='form-control'>
                                    <Field type="email" placeholder="Email" id="email" name="email" className="input input-bordered w-full" disabled={!editMode} />
                                    <ErrorMessage name='email' component={"span"} />
                                </div>
                                {editMode &&
                                    <div className='flex gap-3'>
                                        <button className='btn btn-error flex-1' type='button' onClick={() => { resetForm({ values: initialValues }); setEditMode(false) }}>Cancel</button>
                                        <button className='btn btn-success flex-1' type='submit'>Save</button>
                                    </div>
                                }
                            </Form>
                        )}
                    </Formik>
                    {!editMode &&
                        <div className='flex flex-col gap-3 w-full'>
                            <button className='btn btn-accent flex-1' onClick={() => setEditMode(true)}>Edit profile</button>
                        </div>
                    }
                </div>
                <div className='flex justify-between my-12'>
                    <h1 className='text-lg font-bold'>My Songs</h1>
                </div>
                {songs && songs.map((song) => (
                    <MusicCard
                        id={song._id}
                        title={song.title}
                        author={song.user}
                        editMode
                        usedFor={"profile"}
                        to={`my-song/${song.title}/${song._id}`}
                        key={song._id}
                        songImage={song.bgImage}
                        deleteMySong={() => handleDeleteMySong(song._id)}
                    />
                ))}
            </>}
        </Drawer>
    )
}

export default Profile
