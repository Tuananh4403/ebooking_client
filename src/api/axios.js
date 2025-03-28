import axios from "axios";
import { getToken } from "../utils/auth";
import { SYS_API_URL } from "../constants/global";
const services = {
    auth: import.meta.env.VITE_AUTH_SERVICE_URL,
    booking: import.meta.env.VITE_BOOKING_SERVICE_URL,
    store: import.meta.env.VITE_STORE_SERVICE_URL,
    customer: import.meta.env.VITE_CUSTOMER_SERVICE_URL,
};


const createPublicApi = (service) => {
    const baseURL = services[service];
    if (!baseURL) {
        throw new Error(`API base URL for ${service} is not defined`);
    }
    return axios.create({
        baseURL,
        headers: {
            "Content-Type": "application/json",
        },
    });
};

// Function to create a private API instance (requires token)
const createPrivateApi = (service) => {
    const instance = createPublicApi(service); // Start with the public config
    instance.interceptors.request.use(
        (config) => {
            const token = getToken().accessToken;
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    // Handle Unauthorized Errors
    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                console.warn("Unauthorized! Redirecting to login...");
                localStorage.removeItem("token");
                window.location.href = "/login"; // Redirect to login page
            }
            return Promise.reject(error);
        }
    );

    return instance;
};

// Export API clients
export const apiClient = createPublicApi("auth");
export const authApiPrivate = createPrivateApi("auth");

export const bookingApiPublic = createPublicApi("booking");
export const bookingApiPrivate = createPrivateApi("booking");

export const storeApiPublic = createPublicApi("store");
export const storeApiPrivate = createPrivateApi("store");

export const customerApiPublic = createPublicApi("customer");
export const customerApiPrivate = createPrivateApi("customer");