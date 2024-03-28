import React, { useState } from 'react'
import Drawer from '../components/Drawer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import MusicCard from '../components/MusicCard'
import { Link } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import instance from '../axios'

const Search = () => {
    const [songs, setSongs] = useState([])
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const initialValues = {
        type: '',
        query: ''
    }
    const validationSchema = Yup.object().shape({
        type: Yup.string().required('select any options'),
        query: Yup.string().required()
    });


    const handleSubmit = async (values) => {
        setLoading(true)
        try {
            const response = await instance.get(`search/${values.type}/${values.query}`, { withCredentials: true })
            if (values.type === 'artist') {
                setSongs([])
                setUsers(response.data.users)
            } else {
                setUsers([])
                setSongs(response.data.songs)
            }
            setTimeout(() => {
                setLoading(false)
            }, 500);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Drawer>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form className='flex gap-3'>
                    <div className='form-control'>
                        <Field as='select' className="select select-bordered" id='type' name="type">
                            <option value={''} disabled>search by</option>
                            <option value={"artist"}>artist</option>
                            <option value={"song"}>song</option>
                            <option value={"genre"}>genre</option>
                        </Field>
                        <ErrorMessage name='type' component={'span'} />
                    </div>
                    <div className="form-control w-full">
                        <Field type="search" className='input input-bordered w-full' name='query' id='query' />
                        <ErrorMessage name='query' component={'span'} />
                    </div>
                    <button className='btn btn-accent'>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </Form>
            </Formik>
            {loading &&
                <div className='flex items-center justify-center'>
                    <span className="loading loading-spinner loading-md"></span>
                </div>
            }
            <div className='flex flex-col gap-3 mt-5'>
                {songs && songs.map((song) => (
                    <MusicCard
                        title={song.title}
                        author={song.user}
                        to={`${song.title}/${song._id}`}
                        key={song._id}
                        songImage={song.bgImage}
                    />
                ))}
                {users && users.map((user) => (
                    <Link to={`${user._id}/`} className='flex gap-5 items-center cursor-pointer p-3 rounded-md transition-all ease-in-out duration-500'>
                        <div className="avatar">
                            <div className="w-12 rounded-full">
                                {user.avatar ?
                                    <img src={user.avatar} alt={user.avatar} />
                                    :
                                    <img src={`https://avatar.iran.liara.run/username?username=${user?.username}`} alt='' />
                                }
                            </div>
                        </div>
                        <div className='text-base'>
                            <p className='font-bold'>{user.username}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </Drawer >
    )
}

export default Search
