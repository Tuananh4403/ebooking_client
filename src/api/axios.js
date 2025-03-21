import axios from "axios";
import { getToken } from "../utils/auth";
import { SYS_API_URL } from "../constants/global";

const apiClient = axios.create({
    baseURL: SYS_API_URL,
});

const axiosPrivate = axios.create({
    baseURL: SYS_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add Authorization token to requests
axiosPrivate.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// No global error handling interceptor
export { apiClient, axiosPrivate };
