import React from 'react'
import { Link } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import instance from '../axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { userAuthSuccess } from "../redux-toolkit/userAuth"
import { useDispatch } from 'react-redux'

const SignIn = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('username is required'),
        password: Yup.string().required("password is required")
            .min(8, 'password must be at least 8 characters'),
    });

    const initialValues = {
        username: '',
        password: ''
    }

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const response = await instance.post("user/sign-in", { ...values }, { withCredentials: true })
            toast.success(response.data.message)
            dispatch(userAuthSuccess({ isAuthenticated: response.data.isAuthenticated, user: response.data.user, token: response.data.token }))
            await new Promise(resolve => setTimeout(resolve, 2000));
            navigate("/dashboard")
        } catch (error) {
            toast.error(error.response.data.message)
            resetForm()
        }
    }

    return (
        <div className='h-screen flex items-center justify-center px-5'>
            <div className='flex flex-col max-w-[450px] w-full text-center'>
                <h1 className='text-3xl font-semibold mb-3'>Welcome back!</h1>
                <p className='text-base mb-10'>Sign in to discover,strem and enjoy millions of songs</p>
                <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
                    <Form className='flex flex-col gap-5 w-full'>
                        <div className='form-control'>
                            <Field type="text" placeholder="Username" id="username" name="username" className="input input-bordered w-full" />
                            <ErrorMessage name='username' component={"span"} />
                        </div>
                        <div className='form-control'>
                            <Field type="password" placeholder="Password" id="password" name="password" className="input input-bordered w-full" />
                            <ErrorMessage name='password' component={"span"} />
                        </div>
                        <button className='btn btn-accent text-white'>Sign in</button>
                    </Form>
                </Formik>
                <p className='mt-3'>Forgot your password?</p>
                <p className='my-5'>or contribute with</p>
                <div className='flex gap-5'>
                    <button className="btn btn-neutral flex-1">Google</button>
                    <button className="btn btn-neutral flex-1">Facebook</button>
                </div>
                <p className='mt-5'>Need an account? <Link to={"/sign-up"} className='font-bold'>Register</Link></p>
            </div>
        </div>
    )
}

export default SignIn