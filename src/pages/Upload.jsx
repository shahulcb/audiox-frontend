import React, { useState } from 'react'
import Drawer from '../components/Drawer'
import { Formik, Form, ErrorMessage, Field } from 'formik'
import * as Yup from 'yup';
import instance from '../axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loader from "../components/Loader"

const Upload = () => {
    const [loading, setLoading] = useState(false)
    const [files, setFiles] = useState({
        song: null,
        image: null
    })
    const navigate = useNavigate()
    const initialValues = {
        title: '',
        genre: ''
    }

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("song title is required"),
        genre: Yup.string().required("genre is required"),
        // file: Yup.mixed().required("song is required")
    })

    const handleSubmit = async (values) => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('title', values.title);
            formData.append('genre', values.genre);
            formData.append('song', files.song);
            formData.append('image', files.image)
            const response = await instance.post("song/upload-song", formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true
                })
            setLoading(false)
            toast.success(response.data.message)
            navigate("../")
        } catch (error) {
            setLoading(false)
            toast.error(error.response.data.message)
        }
    }

    const handleFileChange = (event) => {
        const { name, files } = event.target
        setFiles(prevState => ({
            ...prevState,
            [name]: files[0]
        }))
    };

    return (
        <Drawer>
            {loading && <Loader />}
            {!loading && <>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    <Form className='flex flex-col gap-3 max-w-[450px] mx-auto'>
                        <h1 className='text-lg font-medium mb-5'>Upload song</h1>
                        <div className='form-control'>
                            <Field type="text" placeholder="Song title" id='title' name='title' className="input input-bordered w-full" />
                            <ErrorMessage name='title' component={"span"} />
                        </div>
                        <div className='form-control'>
                            <Field type="text" placeholder="Genre" id='genre' name='genre' className="input input-bordered w-full" />
                            <ErrorMessage name='genre' component={"span"} />
                        </div>
                        <div className='form-control'>
                            <span className='text-base !text-base-content'>Select song</span>
                            <input type="file" accept="audio/*" className="file-input file-input-bordered w-full" name='song' id='song' onChange={handleFileChange} />
                            <ErrorMessage name='file' component={"span"} />
                        </div>
                        <div className='form-control'>
                            <span className='text-base !text-base-content'>Select background for song</span>
                            <input type="file" accept="image/*" className="file-input file-input-bordered w-full" name='image' id='image' onChange={handleFileChange} />
                            <ErrorMessage name='image' component={"span"} />
                        </div>
                        <button className='btn btn-accent flex-1'>Upload</button>
                    </Form>
                </Formik>
            </>}
        </Drawer>
    )
}

export default Upload
