import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://whisperbin-api-1.onrender.com/",
    withCredentials : true,
    timeout: 10000,
});

export default axiosClient;
