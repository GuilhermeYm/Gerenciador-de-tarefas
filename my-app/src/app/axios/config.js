import axios from 'axios'


const apiURL = axios.create(
    {
        baseURL: 'http://localhost:5173/',
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
        },
    }
)

export default apiURL