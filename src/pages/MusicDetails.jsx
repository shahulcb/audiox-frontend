import React, { useEffect, useState } from 'react'
import Drawer from '../components/Drawer'
import MusicDetailsCard from '../components/MusicDetailsCard'
import { useParams } from 'react-router-dom'
import instance from '../axios'
import toast from 'react-hot-toast'
import AddComment from '../components/AddComment'
import ViewComments from '../components/ViewComments'
import Loader from "../components/Loader"

const MusicDetails = () => {
    const { songId } = useParams()
    const [songInfo, setSongInfo] = useState({})
    const [isExistInPlaylist, setIsExistInPlaylist] = useState(false)
    const [overallRating, setOverallRating] = useState(0)
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getSongInfo = async () => {
            setLoading(true)
            try {
                const response = await instance.get(`song/song-details/${songId}`, { withCredentials: true })
                setSongInfo(response.data.songInfo)
                setIsExistInPlaylist(response.data.playlistsWithSong)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                toast.error(error.response.data.message)
            }
        }
        getSongInfo()
    }, [])
    useEffect(() => {
        const fetchOverallRating = async () => {
            setLoading(true)
            try {
                const response = await instance.get(`rating/get-overall-rating/${songId}/`, { withCredentials: true })
                setOverallRating(response.data.overallRating)
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        }
        fetchOverallRating()
    }, [])

    useEffect(() => {
        const fetchComments = async () => {
            setLoading(true)
            try {
                const response = await instance.get(`comment/get-comments/${songId}/`, { withCredentials: true })
                updateComments(response.data.comments)
                setLoading(false)
            } catch (error) {
                setLoading(false)
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
    const updatePlaylistStatus = () => {
        setIsExistInPlaylist(true)
    }
    return (
        <Drawer>
            {loading && <Loader />}
            {!loading && <>
                <MusicDetailsCard
                    audioSrc={songInfo.filePath}
                    title={songInfo.title}
                    author={songInfo.user?.username}
                    isExistInPlaylist={isExistInPlaylist}
                    songImage={songInfo.bgImage}
                    overallRating={overallRating}
                    updatePlaylistStatus={updatePlaylistStatus}
                />
                <ViewComments comments={comments} deleteComment={deleteComment} />
                <AddComment updateComments={updateComments} />
            </>}
        </Drawer>
    )
}

export default MusicDetails
