const getToken = () => localStorage.getItem("access");

const config = {
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
                ...(token && { Authorization: `JWT ${token}` }),
            },
        };
    },

    formdataheader: () => {
        const token = getToken();
        return {
            headers: {
                "Content-Type": "multipart/form-data",
                ...(token && { Authorization: `JWT ${token}` }),
            },
        };
    },

    blobheader: () => {
        const token = getToken();
        return {
            headers: {
                "Content-Type": "multipart/form-data",
                ...(token && { Authorization: `JWT ${token}` }),
            },
            responseType: "blob" as const,
        };
    },
};

export default config;
