import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_BASE_URL
})

export default instance