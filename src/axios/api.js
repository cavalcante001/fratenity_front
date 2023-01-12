import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001/api/'
});

export const api = {
    getAllBans: async (page) => {
        let response = await axiosInstance.get(`lista-de-bans/${page}`);
        return response.data;
    }
}