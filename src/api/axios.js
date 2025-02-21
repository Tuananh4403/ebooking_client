import axios from "axios";
import { getToken } from "../utils/auth";
import { SYS_API_URL } from "../constants/global";
import { toastError } from "@/utils/toast";

const apiClient =  axios.create({
    baseURL: SYS_API_URL,
});
const axiosPrivate = axios.create({
    baseURL: SYS_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosPrivate.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
const handleError = (error) => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                toastError('Unauthorized. Please login.');
                break;
            case 403:
                toastError('Forbidden. You do not have permission to access this resource.');
                break;
            case 404:
                toastError('Resource not found.');
                break;
            default:
                toastError('An error occurred. Please try again later.');
        }
    } else if (error.request) {
        console.log(error)
        toastError('No response received. Please check your network.');
    } else {
        toastError('Error: ' + error.message);
    }
    return Promise.reject(error);
};

apiClient.interceptors.response.use(response => response, handleError);
axiosPrivate.interceptors.response.use(response => response, handleError);

export {  apiClient ,axiosPrivate };