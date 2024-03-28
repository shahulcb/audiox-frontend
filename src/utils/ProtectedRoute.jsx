import React, { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogut } from '../redux-toolkit/userAuth';

const ProtectedRoute = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token);
    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                // toast.loading("token expired")
                dispatch(userLogut())
                navigate("/sign-in")
                // toast.dismiss()
            }
        } else {
            // toast.loading("token expired")
            dispatch(userLogut())
            navigate("/sign-in")
            // toast.dismiss()
        }
    }, [navigate, token]);

    return <Outlet />
};

export default ProtectedRoute;
