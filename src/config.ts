const config = {
    //   authUser: localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')) : null,
    client: import.meta.env.VITE_CLIENT,
    server: import.meta.env.VITE_SERVER,
    images: import.meta.env.VITE_CLIENT + '/images',
    api: import.meta.env.VITE_SERVER + '/api',
    valuesType: 'dummy', // it can be dummy, default
    header: () => {
        const token = localStorage.getItem('token');
        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    },
    formdataheader: () => {
        const token = localStorage.getItem('token');
        return {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        };
    },
    blobheader: () => {
        const token = localStorage.getItem('token');
        return {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
            responseType: 'blob'
        };
    },
};

export default config;