import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_ENDPOINT,
    headers: {
        "Content-Type" : "application/json",
        origin : 0,
        "timeout" : 30000,
    }
})

export default instance