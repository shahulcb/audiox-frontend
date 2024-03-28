import React, { useEffect, useState } from 'react'
import Drawer from '../components/Drawer'
import MusicDetailsCard from '../components/MusicDetailsCard'
import { useParams } from 'react-router-dom'
import instance from '../axios'
import toast from 'react-hot-toast'
import AddComment from '../components/AddComment'
import ViewComments from '../components/ViewComments'

const MusicDetails = () => {
    const { songId } = useParams()
    const [songInfo, setSongInfo] = useState({})
    const [isExistInPlaylist, setIsExistInPlaylist] = useState(false)
    const [overallRating, setOverallRating] = useState(0)
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const getSongInfo = async () => {
            try {
                const response = await instance.get(`song/song-details/${songId}`, { withCredentials: true })
                setSongInfo(response.data.songInfo)
                setIsExistInPlaylist(response.data.playlistsWithSong)
            } catch (error) {
                toast.error(error.response.data.message)
            }
        }
        getSongInfo()
    }, [])
    useEffect(() => {
        const fetchOverallRating = async () => {
            try {
                const response = await instance.get(`rating/get-overall-rating/${songId}/`, { withCredentials: true })
                setOverallRating(response.data.overallRating)
            } catch (error) {
                console.log(error);
            }
        }
        fetchOverallRating()
    }, [])

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await instance.get(`comment/get-comments/${songId}/`, { withCredentials: true })
                updateComments(response.data.comments)
            } catch (error) {

            }
        }
        fetchComments()
    }, [songId])

    const updateComments = (newComments) => {
        setComments(prevComments => prevComments.concat(newComments));
    };
    const deleteComment = (id) => {
        setComments(comments => comments.filter((comment) => comment._id !== id))
    }
    return (
        <Drawer>
            <MusicDetailsCard
                audioSrc={songInfo.filePath}
                title={songInfo.title}
                author={songInfo.user?.username}
                isExistInPlaylist={isExistInPlaylist}
                songImage={songInfo.bgImage}
                overallRating={overallRating} />
            <ViewComments comments={comments} deleteComment={deleteComment} />
            <AddComment updateComments={updateComments} />
        </Drawer>
    )
}

export default MusicDetails
