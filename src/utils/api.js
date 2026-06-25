import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            if (error.config && error.config.url && error.config.url.includes('/users/login')) {
                return Promise.reject(error);
            }
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;