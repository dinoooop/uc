import { create } from 'zustand';
import axios from 'axios';
import config from '../../config';
import type { Contact } from './useGeneral';

const svDataLocal = localStorage.getItem('uc_garage_sv_data') ? JSON.parse(localStorage.getItem('uc_garage_sv_data') as string) : null;

interface GeneralStoreProps {
    loading: boolean;
    serverError: string;
    ssm: string;
    statusCode: number;
    resetBeforeRequest: () => void;
    setErrorResponse: (error: any) => void;

    contact: Contact | null;
    svData: Record<string, any>,
    send: (data: Record<string, any>) => Promise<void>;
    regular: () => Promise<void>;
}

export const useGeneralStore = create<GeneralStoreProps>((set, get) => ({
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
    contact: null,
    svData: svDataLocal,
    send: async (data) => {
        get().resetBeforeRequest()
        try {
            const res = await axios.post(`${config.api}/general/contact-submit/`, data);
            set({
                loading: false,
                ssm: res.data.message,
            });
        } catch (err) {
            get().setErrorResponse(err)
            throw err;
        }
    },
    regular: async () => {
        get().resetBeforeRequest()
        try {
            const res = await axios.get(`${config.api}/general/regular/`);
            set({
                loading: false,
                ssm: res.data.message,
                svData: res.data
            });
            localStorage.setItem('uc_garage_sv_data', JSON.stringify(res.data));
        } catch (err) {
            get().setErrorResponse(err)
            throw err;
        }
    },

}));
