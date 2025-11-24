import { create } from 'zustand';
import axios from 'axios';
import config from '../../config';
import type { Car } from '../../bootstrap/stream/carItem';
import { header } from '../cssm/header';

interface CarsState {
    loading: boolean;
    serverError: string;
    ssm: string;
    statusCode: number;
    resetBeforeRequest: () => void;
    setErrorResponse: (error: any) => void;

    items: Car[];
    item: Car | null;
    perPage: number;
    total: number;
    index: (params?: Record<string, any>) => Promise<void>;
    show: (id: number) => Promise<void>;
    store: (data: FormData | Record<string, any>) => Promise<void>;
    update: (data: FormData | Record<string, any>) => Promise<void>;
    destroy: (id: number) => Promise<void>;
    remove: (id: number) => void
}

const useCarStore = create<CarsState>((set, get) => ({

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

    items: [],
    item: null,
    perPage: 0,
    total: 0,

    index: async (params = {}) => {
        try {
            get().resetBeforeRequest()
            const response = await axios.get(`${config.api}/cars/`, {
                params,
                headers: header.json().headers,
            });
            set({
                items: response.data.results || [],
                perPage: response.data.per_page,
                total: response.data.total_pages,
                loading: false,
            });
        } catch (err) {
            get().setErrorResponse(err)
            throw err;
        }
    },
    show: async (id: number): Promise<void> => {
        try {
            get().resetBeforeRequest()
            const response = await axios.get(`${config.api}/cars/show/${id}`, header.json());
            set({ loading: false, item: response.data });
        } catch (err) {
            get().setErrorResponse(err)
            throw err;
        }
    },
    store: async (data: FormData | Record<string, any>): Promise<void> => {
        try {
            get().resetBeforeRequest()
            const theHeader = (data instanceof FormData) ? header.formdata() : header.json();
            await axios.post(`${config.api}/cars/store/`, data, theHeader);
            set({ loading: false });
        } catch (err) {
            get().setErrorResponse(err)
            throw err;
        }
    },
    update: async (data: FormData | Record<string, any>): Promise<void> => {
        try {
            get().resetBeforeRequest()
            const theHeader = (data instanceof FormData) ? header.formdata() : header.json();
            const theId = (data instanceof FormData) ? data.get("id") : data.id;
            await axios.put(`${config.api}/cars/update/${theId}/`, data, theHeader);
            set({ loading: false });
        } catch (err) {
            get().setErrorResponse(err)
            throw err;
        }
    },
    destroy: async (id: number): Promise<void> => {
        try {
            get().resetBeforeRequest()
            await axios.delete(`${config.api}/cars/delete/${id}/`, header.json())
            set({ loading: false });
        } catch (err) {
            get().setErrorResponse(err)
            throw err;
        }
    },
    remove: (id) => {
        set((state: any) => ({
            items: state.items.filter((item: Car) => item.id !== id),
        }))
    },

}));

export default useCarStore;
