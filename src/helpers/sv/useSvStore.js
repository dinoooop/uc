import { create } from 'zustand';
import axios from 'axios';
import config from '../../config';


const svDataLocal = localStorage.getItem('sv_data') ? JSON.parse(localStorage.getItem('sv_data')) : null;
// Store server value to the client side
const useSvStore = create((set) => ({
    svData: svDataLocal,
    error: '',
    getStock: async (data = {}) => {
        try {
            const response = await axios.get(`${config.api}/sv/regular`);
            localStorage.setItem('sv_data', JSON.stringify(response.data))
            set({ svData: response.data });
        } catch (error) {
            set({
                error: error.response.data.message ?? 'Server error'
            });
        }
    },
}));

export default useSvStore;