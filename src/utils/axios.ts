import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials : true,
    timeout: 10000,
});

export default axiosClient;
