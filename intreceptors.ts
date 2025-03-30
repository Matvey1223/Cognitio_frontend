import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';


// Тип для токена
type Token = string | null;

// ===== 1. axiosClassic (без токена) =====
export const axiosClassic: AxiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

// ===== 2. axiosWithAuth (с токеном из куков) =====
export const axiosWithAuth: AxiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

// Интерцептор для добавления токена в запросы
axiosWithAuth.interceptors.request.use((config: AxiosRequestConfig | any) => {
    const accessToken: Token = Cookies.get('access_token') || null;

    if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

// Интерцептор для обработки ошибок (например, 401)
axiosWithAuth.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        // Если токен недействителен (401)
        if (error.response?.status === 401) {
            Cookies.remove('accessToken');
            window.location.href = '/login'; // Редирект на страницу входа
        }
        return Promise.reject(error);
    }
);