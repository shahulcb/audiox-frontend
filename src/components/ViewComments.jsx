import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useSelector } from 'react-redux';
import instance from '../axios';
import toast from 'react-hot-toast';

const ViewComments = ({ comments, deleteComment }) => {
    const user = useSelector(state => state.user.user);
    const handleDeleteComment = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete comment?");
        if (confirmed) {
            try {
                const response = await instance.post("comment/delete-comment/", { commentId: id }, { withCredentials: true })
                toast.success(response.data.message)
                deleteComment(id)
            } catch (error) {
                console.log(error);
            }
        }

    }
    return (
        <div className='card glass my-5'>
            <div className='card-body gap-4'>
                <p className='text-base font-medium'>Comments</p>
                {comments.length > 0 && comments.map((comment) => (
                    <div className='flex gap-1 justify-between' key={comment._id}>
                        <div className='flex gap-3 items-center'>
                            <div>
                                <div className="avatar">
                                    <div className="w-12 rounded-full">
                                        {comment.user?.avatar ?
                                            <img src={comment.user?.avatar} alt='' />
                                            :
                                            <img src={`https://avatar.iran.liara.run/username?username=${user?.username}`} alt='' />
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='text-base font-semibold'>{comment.user.username} {comment.author && <span className='p-1 text-base font-semibold bg-neutral text-neutral-content rounded-md'>by author</span>}</p>
                                <p className='text-base font-normal'>{comment.text}</p>
                            </div>
                        </div>
                        {comment.user._id === user?._id &&
                            <div className="dropdown dropdown-left">
                                <div tabIndex={0} role="button" className="btn btn-ghost m-1"><FontAwesomeIcon icon={faEllipsisVertical} /></div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52">
                                    <li><a onClick={() => handleDeleteComment(comment._id)}>Delete</a></li>
                                </ul>
                            </div>
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ViewComments
