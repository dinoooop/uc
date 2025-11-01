import { create } from 'zustand';
import axios from 'axios';
import config from '../../config';
import type { Contact } from '../../bootstrap/stream/contactType';
import { contactData } from '../../bootstrap/stream/contactData';

const svDataLocal = localStorage.getItem('uc_garage_sv_data') ? JSON.parse(localStorage.getItem('uc_garage_sv_data') as string) : null;

interface GeneralState {
    contact: Contact;
    loading: boolean;
    sem: string; // server error message
    ssm: string; // server success message
    svData: Record<string, any>,
    resetBeforeRequest: () => void;
    send: (data: Record<string, any>) => Promise<void>;
    regular: () => Promise<void>;
}

export const useGeneralStore = create<GeneralState>((set, get) => ({
    contact: contactData,
    loading: false,
    sem: '',
    ssm: '',
    svData: svDataLocal,
    resetBeforeRequest: () => set({
        loading: true,
        sem: '',
        ssm: '',
    }),
    send: async (data) => {
        get().resetBeforeRequest()
        try {
            const res = await axios.post(`${config.api}/general/contact-submit/`, data);
            set({
                loading: false,
                ssm: res.data.message,
            });
        } catch (error: any) {
            set({
                loading: false,
                sem: error.response?.data?.message ?? 'Server Error',
            });
            throw error;
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
        } catch (error: any) {
            set({
                loading: false,
                sem: error.response?.data?.message ?? 'Server Error',
            });
            throw error;
        }
    },

}));
