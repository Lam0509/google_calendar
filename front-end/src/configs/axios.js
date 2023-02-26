import axios from 'axios'

const PORT = 8000;

export const Axios = axios.create({
    baseURL: `http://localhost:${PORT}/api`
});