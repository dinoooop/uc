import { create } from 'zustand';
import axios from 'axios';
import config from '../../config';

interface User {
    id: number;
    full_name: string;
    email: string;
    is_staff: boolean;
}

interface AuthState {
    loading: boolean;
    serverError: string;
    ssm: string;
    statusCode: number;
    resetBeforeRequest: () => void;
    setErrorResponse: (error: any) => void;

    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    theme: string | undefined;
    login: (data: Record<string, any>) => Promise<void>;
    register: (data: any) => Promise<void>;
    logout: () => void;
    refreshAccessToken: () => Promise<string | null>;
    check: () => Promise<void>;
}

const userFromStorage = localStorage.getItem('authUser')
    ? JSON.parse(localStorage.getItem('authUser') as string)
    : null;

const accessFromStorage = localStorage.getItem('access')
    ? localStorage.getItem('access')
    : null;

const refreshFromStorage = localStorage.getItem('refresh')
    ? localStorage.getItem('refresh')
    : null;

const themeFromStorage = localStorage.getItem('theme')
    ? localStorage.getItem('theme')
    : 'light';

export const useAuthStore = create<AuthState>((set, get) => ({
    loading: false,
    serverError: '',
    ssm: '',
    statusCode: 0,
    resetBeforeRequest: () => set({
        loading: true,
        serverError: '',
        ssm: '',
    }),
    setErrorResponse: (error: any) => {
        set({
            loading: false,
            serverError: error.response?.data?.message ?? 'Server error',
            ssm: '',
            statusCode: error.response?.status ?? 500,
        });
    },

    user: userFromStorage,
    accessToken: accessFromStorage,
    refreshToken: refreshFromStorage,
    theme: themeFromStorage,

    login: async (data) => {

        try {
            get().resetBeforeRequest()
            const res = await axios.post(`${config.api}/accounts/login/`, data);
            const { user, tokens } = res.data;

            localStorage.setItem('authUser', JSON.stringify(user));
            localStorage.setItem('access', tokens.access);
            localStorage.setItem('refresh', tokens.refresh);

            set({
                loading: false,
                user,
                accessToken: tokens.access,
                refreshToken: tokens.refresh,
            });

            if (user.is_staff) {
                // window.location.href = '/admin/cars/create';
            } else {
                // window.location.href = '/account/cars/create';
            }

        } catch (err) {
            get().setErrorResponse(err)
            throw err;
        }
    },

    // 🔹 REGISTER
    register: async (data) => {

        try {
            get().resetBeforeRequest()
            const res = await axios.post(`${config.api}/accounts/register/`, data);
            const { user, tokens } = res.data;

            localStorage.setItem('authUser', JSON.stringify(user));
            localStorage.setItem('access', tokens.access);
            localStorage.setItem('refresh', tokens.refresh);

            set({
                loading: false,
                user,
                accessToken: tokens.access,
                refreshToken: tokens.refresh,
            });
        } catch (err) {
            get().setErrorResponse(err)
            throw err;
        }
    },

    // 🔹 LOGOUT
    logout: () => {
        localStorage.removeItem('authUser');
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        set({ user: null, accessToken: null, refreshToken: null });
        window.location.href = '/login';
    },

    // 🔹 REFRESH ACCESS TOKEN
    refreshAccessToken: async () => {
        const refresh = localStorage.getItem('refresh');
        if (!refresh) return null;

        try {
            const res = await axios.post(`${config.api}/token/refresh/`, { refresh });
            const newAccess = res.data.access;
            localStorage.setItem('access', newAccess);
            set({ accessToken: newAccess });
            return newAccess;
        } catch (error) {
            get().logout();
            return null;
        }
    },
    check: async () => {
        try {
            get().resetBeforeRequest()
            const response = await axios.get(`${config.api}/accounts/check/`, config.header());
            const user = response.data.user
        } catch (error) {
            localStorage.removeItem('authUser')
            localStorage.removeItem('access')
            window.location.href = '/login'
        }
    },

}));
