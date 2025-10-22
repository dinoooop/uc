import { create } from 'zustand';
import axios from 'axios';
import config from '../config';

interface User {
    id: number;
    full_name: string;
    email: string;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    loading: boolean;
    error: string;
    success: string;
    theme: string | null;

    login: (data: { email: string; password: string }) => Promise<void>;
    register: (data: any) => Promise<void>;
    logout: () => void;
    refreshAccessToken: () => Promise<string | null>;
    checkAuth: () => Promise<void>;
    reset: () => void;
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
    user: userFromStorage,
    accessToken: accessFromStorage,
    refreshToken: refreshFromStorage,
    loading: false,
    error: '',
    success: '',
    theme: themeFromStorage,

    // 🔹 LOGIN
    login: async (data) => {
        set({ loading: true, error: '', success: '' });
        try {
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
        } catch (error: any) {
            set({
                loading: false,
                error: error.response?.data?.error ?? 'Login failed',
            });
            throw error;
        }
    },

    // 🔹 REGISTER
    register: async (data) => {
        set({ loading: true, error: '', success: '' });
        try {
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
        } catch (error: any) {
            set({
                loading: false,
                error: error.response?.data?.error ?? 'Registration failed',
            });
            throw error;
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

    // 🔹 CHECK AUTH
    checkAuth: async () => {
        set({ loading: true });
        const token = localStorage.getItem('access');
        if (!token) {
            get().logout();
            return;
        }

        try {
            await axios.get(`${config.api}/auth/check/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            set({ loading: false });
        } catch (error: any) {
            if (error.response?.status === 401) {
                const newAccess = await get().refreshAccessToken();
                if (!newAccess) get().logout();
            } else {
                get().logout();
            }
            set({ loading: false });
        }
    },

    // 🔹 RESET STATE
    reset: () => set({ loading: false, error: '', success: '' }),
}));
