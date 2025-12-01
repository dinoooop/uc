import { create } from 'zustand';
import axios from 'axios';
import config from '../../config';

const svDataLocal = localStorage.getItem('uc_garage_sv_data') ? JSON.parse(localStorage.getItem('uc_garage_sv_data') as string) : null;

interface SvStoreProps {
    svData: Record<string, any>,
    regular: () => Promise<void>;
}

export const useSvStore = create<SvStoreProps>((set) => ({
    svData: svDataLocal,
    regular: async () => {
        try {
            const res = await axios.get(`${config.api}/sv/regular/`);
            set({ svData: res.data });
            localStorage.setItem('uc_garage_sv_data', JSON.stringify(res.data));
        } catch (err) {
            throw err;
        }
    },
}));
