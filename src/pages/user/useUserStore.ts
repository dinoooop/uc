import { create } from 'zustand';
import axios from 'axios';
import config from '../../config';

interface User {
    id?: number;
    name?: string;
    email?: string;
    [key: string]: any;
}

interface UsersState {
    items: User[];
    item: User | null;
    loading: boolean;
    sem: string;
    ssm: string;
    index: (params?: Record<string, any>) => Promise<void>;
    show: (id: number) => Promise<void>;
    store: (data: FormData | Record<string, any>) => Promise<void>;
    update: (data: FormData | Record<string, any>) => Promise<void>;
    destroy: (id: number) => Promise<void>;
    remove: (id: number) => void;
    reset: () => void;
}

const useUserStore = create<UsersState>((set: any, get: any) => ({
    items: [],
    item: null,
    loading: false,
    sem: '',
    ssm: '',

    index: async (params = {}) => {
        
        try {
            get().resetBeforeMakeRequest()
            const response = await axios.get(`${config.api}/users/`, {
                params,
                headers: config.header().headers,
            });
            set({ items: response.data.results || [], loading: false });
        } catch (err: any) {
            set({ loading: false, sem: err?.response?.data?.message ?? 'Server error' });
        }
    },

    show: async (id: number) => {
        set({ loading: true, sem: '' });
        try {
            const response = await axios.get(`${config.api}/users/show/${id}`, config.header());
            set({ item: response.data, loading: false });
        } catch (err: any) {
            set({ loading: false, sem: err?.response?.data?.message ?? 'Server error' });
        }
    },

    store: async (data) => {
        set({ loading: true, sem: '' });
        try {
            const theHeader = config.blobheader();
            const response = await axios.post(`${config.api}/users/store/`, data, theHeader);
            set({ item: response.data, loading: false });
        } catch (err: any) {
            set({ loading: false, sem: err?.response?.data?.message ?? 'Server error' });
            throw err;
        }
    },

    update: async (data) => {
        set({ loading: true, sem: '' });
        try {
            const theHeader = config.blobheader();
            // assume data.id is present
            const response = await axios.put(`${config.api}/users/update/${(data as any).id}/`, data, theHeader);
            set({ item: response.data, loading: false });
        } catch (err: any) {
            set({ loading: false, sem: err?.response?.data?.message ?? 'Server error' });
            throw err;
        }
    },

    destroy: async (id: number) => {
        set({ loading: true, sem: '' });
        try {
            await axios.delete(`${config.api}/users/delete/${id}/`, config.header());
            set({ loading: false });
        } catch (err: any) {
            set({ loading: false, sem: err?.response?.data?.message ?? 'Server error' });
            throw err;
        }
    },

    remove: (id: number) => set((state: any) => ({ items: state.items.filter((i: User) => i.id !== id) })),

    reset: () => set({ items: [], item: null, loading: false, sem: '', ssm: '' }),
    resetBeforeMakeRequest: () => set({ loading: true, sem: '', ssm: '' }),
}));

export default useUserStore;
