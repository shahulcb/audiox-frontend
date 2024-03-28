import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false,
    token: JSON.parse(localStorage.getItem('token')) || ''
}

const userAuthSlice = createSlice({
    name: "userAuthSlice",
    initialState,
    reducers: {
        userAuthSuccess: (state, action) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.user = action.payload.user;
            state.token = action.payload.token
            localStorage.setItem('isAuthenticated', JSON.stringify(action.payload.isAuthenticated));
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            localStorage.setItem('token', JSON.stringify(action.payload.token))
        },
        userUpdate: (state, action) => {
            state.user = { ...state.user, ...action.payload }
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        userLogut: (state) => {
            state.isAuthenticated = false
            state.user = null
            state.token = ''
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('user');
            localStorage.removeItem('token')
        }
    }
})

export const { userAuthSuccess, userUpdate, userLogut } = userAuthSlice.actions
export default userAuthSlice.reducer 