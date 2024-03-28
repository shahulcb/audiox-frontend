import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

const MusicCard = ({ editMode, to, handleIdForDeleteSong, title, author, usedFor, deleteMySong, songImage, id }) => {
    return (

        <div className='flex justify-between items-center cursor-pointer p-3 rounded-md transition-all ease-in-out duration-500'>
            <Link to={to}>
                <div className='flex gap-5 items-center'>
                    <div className="avatar">
                        <div className="w-12 rounded">
                            <img src={songImage} alt="Tailwind-CSS-Avatar-component" />
                        </div>
                    </div>
                    <div className='text-base'>
                        <p className='font-bold'>{title}</p>
                        <p className='text-gray-400'>{author?.username}</p>
                    </div>
                </div>
            </Link>
            {editMode &&
                <div className="dropdown dropdown-left">
                    <div tabIndex={0} role="button" className="btn btn-ghost m-1"><FontAwesomeIcon icon={faEllipsisVertical} /></div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52">
                        {usedFor === "playlist" &&
                            <>
                                <li onClick={handleIdForDeleteSong}><a>Remove</a></li>
                            </>
                        }
                        {usedFor === "profile" &&
                            <>
                                <li><Link to={`edit-song/${id}`}>Edit</Link></li>
                                <li onClick={deleteMySong}><a>Delete</a></li>
                            </>
                        }
                    </ul>
                </div>
            }
        </div>
    )
}

export default MusicCard
