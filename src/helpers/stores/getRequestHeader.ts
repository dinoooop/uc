import axios from "axios";
import config from "../../config";

class request {

    static async refreshAccessToken() {
        const refresh = localStorage.getItem('refresh');
        if (!refresh) return null;

        try {
            const res = await axios.post(`${config.api}/token/refresh/`, { refresh });
            const newAccess = res.data.access;
            localStorage.setItem('access', newAccess);
            return newAccess;
        } catch (error) {
            return null;
        }
    }

    static async getToken() {
        const access = localStorage.getItem("access")
        if (access) {
            return access
        } else {
            const newToken = await this.refreshAccessToken();
            return newToken
            
        }
    }

    static regular() {
        return {
            headers: {
                "Content-Type": "application/json",
            },
        };
    }

    static async header() {
        const token = await this.getToken();

        return {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        };

    }


    static async formdataheader() {
        const token = await this.getToken();
        return {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        };
    }

    static async blobheader() {
        const token = await this.getToken();
        return {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
            responseType: "blob" as const,
        };
    }
}