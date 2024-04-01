import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import instance from '../axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('username is required')
            .min(5, 'username must be at least 5 characters')
            .max(30, 'username cannot exceed 30 characters'),
        password: Yup.string().required("password is required")
            .min(8, 'password must be at least 8 characters'),
        confirmPassword: Yup.string().required("confirm password is required")
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        email: Yup.string().email('Invalid email').required('Email is required'),
    });

    const initialValues = {
        username: '',
        password: '',
        confirmPassword: '',
        email: ''
    }

    const handleSubmit = async (values, { resetForm }) => {
        setLoading(true)
        try {
            const response = await instance.post("user/sign-up", { ...values })
            if (response.data.success) {
                toast.success(response.data.message)
                setLoading(false)
                navigate("/sign-in")
            } else {
                toast.error(response.data.message)
                setLoading(false)
                resetForm()
            }
        } catch (error) {
            toast.error(error.message);
            setLoading(false)
            resetForm()
        }
    }

    return (
        <div className='h-screen flex items-center justify-center px-5'>
            <div className='flex flex-col max-w-[450px] w-full text-center'>
                <h1 className='text-3xl font-semibold mb-3'>Hi!</h1>
                <p className='text-base mb-10'>Sign up to start listening to all your favorite artist</p>
                <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                    <Form className='flex flex-col gap-5 w-full'>
                        <div className='form-control'>
                            <Field type="text" placeholder="Username" id="username" name="username" className="input input-bordered w-full" />
                            <ErrorMessage name='username' component={"span"} />
                        </div>
                        <div className='flex gap-5 flex-wrap'>
                            <div className='form-control flex-1'>
                                <Field type="password" placeholder="Password" id="password" name="password" className="input input-bordered w-full" />
                                <ErrorMessage name='password' component={"span"} />
                            </div>
                            <div className='form-control flex-1'>
                                <Field type="password" placeholder="Confirm password" id="confirmPassword" name="confirmPassword" className="input input-bordered w-full" />
                                <ErrorMessage name='confirmPassword' component={"span"} />
                            </div>
                        </div>
                        <div className='form-control'>
                            <Field type="email" placeholder="Email" id="email" name="email" className="input input-bordered w-full" />
                            <ErrorMessage name='email' component={"span"} />
                        </div>
                        <button className='btn btn-accent' disabled={loading}>{loading ? <span className="loading loading-spinner loading-md"></span> : "Register"}</button>
                    </Form>
                </Formik>
                <p className='my-5'>or contribute with</p>
                <div className='flex gap-5'>
                    <button className="btn btn-neutral flex-1">Google</button>
                    <button className="btn btn-neutral flex-1">Facebook</button>
                </div>
            </div>
        </div>
    )
}

export default SignUp
