const getToken = () => localStorage.getItem("access");

const config = {
    appName: import.meta.env.VITE_APP_NAME, 
    client: import.meta.env.VITE_CLIENT,
    server: import.meta.env.VITE_SERVER,
    images: `${import.meta.env.VITE_CLIENT}/images`,
    api: `${import.meta.env.VITE_SERVER}/api`,
    valuesType: "dummy",

    header: () => {
        const token = getToken();
        return {
            headers: {
                "Content-Type": "application/json",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        };
    },

    formdataheader: () => {
        const token = getToken();
        return {
            headers: {
                "Content-Type": "multipart/form-data",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        };
    },

    blobheader: () => {
        const token = getToken();
        return {
            headers: {
                "Content-Type": "multipart/form-data",
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            responseType: "blob" as const,
        };
    },
};

export default config;
