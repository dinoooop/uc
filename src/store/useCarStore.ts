import { create } from 'zustand';
import axios, { AxiosError } from 'axios';
import config from '../config';

export interface Car {
    id: number;
    name: string;
    brand: string;
    year: number;
    price: number;
    travelled: number;
    mileage: number;
    created_at: string;
}

interface CarsState {
    items: Car[];
    item: Car | null;
    perPage: number;
    total: number;
    loading: boolean;
    success: string;
    error: string | null;
    statusCode: number;

    index: (params?: Record<string, any>) => Promise<void>;
    reset: (params?: Record<string, any>) => Promise<void>;
}

const useCarStore = create<CarsState>((set: any) => ({
    items: [],
    item: null,
    perPage: 0,
    total: 0,
    loading: false,
    success: '',
    error: null,
    statusCode: 0,

    index: async (params = {}) => {
        set({ loading: true, error: null, success: '' });
        try {
            const response = await axios.get(`${config.api}/cars`, {
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
                error: error.response?.data?.message ?? 'Server error',
                success: '',
                statusCode: error.response?.status ?? 500,
            });
        }
    },
    reset: () => set({
        error: '',
        success: '',
        loading: false,
        items: []
    })

}));

export default useCarStore;
