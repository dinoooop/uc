import { create } from 'zustand';
import axios, { AxiosError } from 'axios';
import config from '../../config';
import type { Car } from '../../bootstrap/stream/carItem';

interface CarsState {
    items: Car[];
    item: Car | null;
    perPage: number;
    total: number;
    loading: boolean;
    success: string;
    serverError: string;
    statusCode: number;
    index: (params?: Record<string, any>) => Promise<void>;
    show: (id: number) => Promise<void>;
    store: (data: FormData | Record<string, any>) => Promise<void>;
    update: (data: FormData | Record<string, any>) => Promise<void>;
    destroy: (id: number) => Promise<void>;
    remove: (id: number) => void
    reset: (params?: Record<string, any>) => Promise<void>;
}

const useCarStore = create<CarsState>((set: any) => ({
    items: [],
    item: null,
    perPage: 0,
    total: 0,
    loading: false,
    success: '',
    serverError: '',
    statusCode: 0,

    index: async (params = {}) => {
        set({ loading: true, serverError: null, success: '' });
        try {
            const response = await axios.get(`${config.api}/cars/`, {
                params,
                headers: config.header().headers,
            });
            set({
                items: response.data.results || [],
                perPage: response.data.per_page,
                total: response.data.total_pages,
                loading: false,
            });
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            set({
                loading: false,
                serverError: error.response?.data?.message ?? 'Server error',
                success: '',
                statusCode: error.response?.status ?? 500,
            });
        }
    },
    show: async (id: number): Promise<void> => {
        try {
            set({ loading: true, success: '', error: '' });
            const response = await axios.get(`${config.api}/cars/show/${id}`, config.header());
            set({
                loading: false,
                item: response.data
            });
        } catch (error: any) {
            set({
                loading: false,
                error: error.response.data.message ?? 'Server error',
                statusCode: error.response?.status ?? 500,
                success: '',
            });
        }
    },
    store: async (data: FormData | Record<string, any>): Promise<void> => {
        try {
            const theHeader = config.blobheader()
            set({ loading: true, success: "", error: "" });
            const response = await axios.post(`${config.api}/cars/store/`, data, theHeader);

            set({
                loading: false,
                item: response.data,
                success: "Data stored successfully",
            });
        } catch (error: any) {
            set({
                loading: false,
                serverError: error?.response?.data?.message ?? "Server error",
                success: "",
            });
            throw error;
        }
    },
    update: async (data: FormData | Record<string, any>): Promise<void> => {

        console.log("the id is" , data.id);
        
        try {
            const theHeader = config.blobheader()
            set({ loading: true, success: "", error: "" });
            const response = await axios.put(`${config.api}/cars/update/${data.id}/`, data, theHeader);

            set({
                loading: false,
                item: response.data,
                success: "Data updated successfully",
            });
        } catch (error: any) {
            set({
                loading: false,
                serverError: error?.response?.data?.message ?? "Server error",
                success: "",
            });
            throw error;
        }
    },
    destroy: async (id: number): Promise<void> => {
        set({ loading: true, success: '', error: '' });
        try {
            const response = await axios.delete(`${config.api}/cars/delete/${id}/`, config.header())
            set({
                loading: false,
                item: response.data,
            });
        } catch (error: any) {
            set({
                loading: false,
                serverError: error?.response?.data?.message ?? "Server error",
                success: '',
            });
            throw error;
        }
    },
    remove: (id) => {
        set((state: any) => ({
            items: state.items.filter((item: Car) => item.id !== id),
        }))
    },
    reset: () => set({
        serverError: '',
        success: '',
        loading: false,
        items: []
    })

}));

export default useCarStore;
