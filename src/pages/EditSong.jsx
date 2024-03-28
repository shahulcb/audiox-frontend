import React, { useEffect, useState } from 'react'
import Drawer from '../components/Drawer'
import instance from '../axios'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import * as Yup from 'yup';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditSong = () => {
    const navigate = useNavigate()
    const { songId } = useParams()
    const [songDetails, setSongDetails] = useState(null);

    const [files, setFiles] = useState({
        image: null
    })

    const initialValues = {
        title: songDetails ? songDetails.title : '',
        genre: songDetails ? songDetails.genre : '',
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("song title is required"),
        genre: Yup.string().required("genre is required"),
    })
    const handleFileChange = (event) => {
        const { name, files } = event.target
        setFiles(prevState => ({
            ...prevState,
            [name]: files[0]
        }))
    };
    useEffect(() => {
        const fetchSongDetails = async () => {
            try {
                const response = await instance.get(`song/get-song-details/${songId}`, { withCredentials: true })
                setSongDetails(response.data.songDetails);
            } catch (error) {
                console.log(error);
            }
        }
        fetchSongDetails()
    }, [])
    const handleSubmit = async (values) => {
        const formData = new FormData()
        formData.append("title", values.title)
        formData.append("genre", values.genre)
        formData.append("songId", songId)
        formData.append("image", files.image)
        try {
            const response = await instance.post("song/update-song-details", formData, { withCredentials: true })
            toast.success(response.data.message)
            navigate("../")
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Drawer>
            {songDetails &&
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    <Form className='flex flex-col gap-3 max-w-[450px] mx-auto'>
                        <h1 className='text-lg font-medium mb-5'>Edit song</h1>
                        <div className='form-control'>
                            <Field type="text" placeholder="Song title" id='title' name='title' className="input input-bordered w-full" />
                            <ErrorMessage name='title' component={"span"} />
                        </div>
                        <div className='form-control'>
                            <Field type="text" placeholder="Genre" id='genre' name='genre' className="input input-bordered w-full" />
                            <ErrorMessage name='genre' component={"span"} />
                        </div>
                        <div className='form-control'>
                            <span className='text-base !text-base-content'>Select background for song</span>
                            <input type="file" accept="image/*" className="file-input file-input-bordered w-full" name='image' id='image' onChange={handleFileChange} />
                        </div>
                        <div className='flex gap-3'>
                            <Link className='btn btn-error flex-1' to={"../"}>Cancel</Link>
                            <button className='btn btn-accent flex-1'>Save</button>
                        </div>
                    </Form>
                </Formik>
            }
        </Drawer>
    )
}

export default EditSong
