import { ErrorMessage, Field, Form, Formik } from 'formik'
import React from 'react'
import instance from '../axios'
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';

const AddComment = ({ updateComments }) => {
    const { songId } = useParams()
    const initialValues = {
        comment: ''
    }
    const validationSchema = Yup.object().shape({
        comment: Yup.string().required()
    })

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const response = await instance.post("comment/upload-comment", { ...values, songId }, { withCredentials: true })
            updateComments(response.data.newComment)
            resetForm()

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className='card glass'>
            <div className='card-body'>
                <h1 className='mb-5 text-base font-medium'>Add a comment</h1>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    <Form className='flex flex-col gap-3'>
                        <div className='form-control'>
                            <Field placeholder="Whats you'r view?" id={"comment"} name={"comment"} className="textarea textarea-bordered textarea-md bg-transparent w-full max-w-sm"></Field>
                            <ErrorMessage name='comment' component={"span"} />
                        </div>
                        <button className='btn btn-success max-w-40'>Submit</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default AddComment
